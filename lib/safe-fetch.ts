import { lookup as dnsLookup, promises as dnsPromises } from "node:dns";
import type { LookupAddress } from "node:dns";
import * as http from "node:http";
import type { IncomingHttpHeaders } from "node:http";
import * as https from "node:https";
import { isIP } from "node:net";
import type { LookupFunction } from "node:net";
import type { Readable } from "node:stream";
import * as zlib from "node:zlib";

// Server side fetch for URLs that a visitor typed in. Without these checks, a
// tool that fetches "any URL" can be pointed at the server's own network
// (localhost, private ranges, cloud metadata at 169.254.169.254) or used to
// pull down huge files. This module only talks to public websites, re-checks
// every redirect, validates the address at connect time so DNS tricks cannot
// slip past, and caps response size and total time.

/** Thrown for URLs that must never be fetched. The message is safe to show. */
export class UnsafeUrlError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnsafeUrlError";
  }
}

const REFUSED = "That address cannot be audited. Use the public address of your store.";

// ---------------------------------------------------------------------------
// Address classification
// ---------------------------------------------------------------------------

function parseIPv4(ip: string): number[] | null {
  const parts = ip.split(".");
  if (parts.length !== 4) return null;
  const nums = parts.map((p) => (/^\d{1,3}$/.test(p) ? Number(p) : NaN));
  return nums.every((n) => n >= 0 && n <= 255) ? nums : null;
}

function isPrivateIPv4(o: number[]): boolean {
  const [a, b, c] = o;
  return (
    a === 0 || // "this" network
    a === 10 ||
    (a === 100 && b >= 64 && b <= 127) || // carrier grade NAT
    a === 127 || // loopback
    (a === 169 && b === 254) || // link local, includes cloud metadata
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 0 && (c === 0 || c === 2)) || // IETF and TEST-NET-1
    (a === 192 && b === 168) ||
    (a === 198 && (b === 18 || b === 19)) || // benchmarking
    (a === 198 && b === 51 && c === 100) || // TEST-NET-2
    (a === 203 && b === 0 && c === 113) || // TEST-NET-3
    a >= 224 // multicast, reserved, broadcast
  );
}

/** Expand an IPv6 string into eight 16 bit groups, or null if malformed. */
function parseIPv6(input: string): number[] | null {
  let s = input.toLowerCase();
  const zone = s.indexOf("%");
  if (zone !== -1) s = s.slice(0, zone);

  let tail: number[] = [];
  if (s.includes(".")) {
    const lastColon = s.lastIndexOf(":");
    const v4 = parseIPv4(s.slice(lastColon + 1));
    if (!v4) return null;
    tail = [(v4[0] << 8) | v4[1], (v4[2] << 8) | v4[3]];
    s = s.slice(0, lastColon + 1) + "0:0";
  }

  const halves = s.split("::");
  if (halves.length > 2) return null;
  const groups = (h: string) => (h === "" ? [] : h.split(":"));
  const head = groups(halves[0]);
  const rest = halves.length === 2 ? groups(halves[1]) : [];

  let full: string[];
  if (halves.length === 2) {
    const missing = 8 - head.length - rest.length;
    if (missing < 1) return null;
    full = [...head, ...Array<string>(missing).fill("0"), ...rest];
  } else {
    full = head;
  }
  if (full.length !== 8) return null;

  const nums = full.map((g) => (/^[0-9a-f]{1,4}$/.test(g) ? parseInt(g, 16) : NaN));
  if (nums.some((n) => Number.isNaN(n))) return null;
  if (tail.length) {
    nums[6] = tail[0];
    nums[7] = tail[1];
  }
  return nums;
}

function embeddedIPv4(hi: number, lo: number): number[] {
  return [hi >> 8, hi & 255, lo >> 8, lo & 255];
}

function isPrivateIPv6(g: number[]): boolean {
  const zeros = (from: number, to: number) => g.slice(from, to).every((x) => x === 0);
  if (zeros(0, 8)) return true; // ::
  if (zeros(0, 7) && g[7] === 1) return true; // ::1
  if (zeros(0, 5) && g[5] === 0xffff) return isPrivateIPv4(embeddedIPv4(g[6], g[7])); // ::ffff:a.b.c.d
  if (zeros(0, 6)) return isPrivateIPv4(embeddedIPv4(g[6], g[7])); // deprecated IPv4 compatible
  if (g[0] === 0x64 && g[1] === 0xff9b && zeros(2, 6)) return isPrivateIPv4(embeddedIPv4(g[6], g[7])); // NAT64
  if ((g[0] & 0xfe00) === 0xfc00) return true; // fc00::/7 unique local
  if ((g[0] & 0xffc0) === 0xfe80) return true; // fe80::/10 link local
  if ((g[0] & 0xff00) === 0xff00) return true; // multicast
  if (g[0] === 0x2002) return isPrivateIPv4(embeddedIPv4(g[1], g[2])); // 6to4
  if (g[0] === 0x2001 && g[1] === 0) return true; // Teredo
  if (g[0] === 0x2001 && g[1] === 0x0db8) return true; // documentation
  if (g[0] === 0x0100 && zeros(1, 4)) return true; // discard prefix
  return false;
}

/** True when an IP literal is not a normal public internet address. */
export function isPrivateAddress(ip: string): boolean {
  const family = isIP(ip);
  if (family === 4) {
    const o = parseIPv4(ip);
    return o ? isPrivateIPv4(o) : true;
  }
  if (family === 6) {
    const g = parseIPv6(ip);
    return g ? isPrivateIPv6(g) : true;
  }
  return true; // not an IP at all, so treat as unsafe
}

// ---------------------------------------------------------------------------
// URL and host validation
// ---------------------------------------------------------------------------

const BLOCKED_SUFFIXES = [
  ".localhost",
  ".local",
  ".internal",
  ".localdomain",
  ".home.arpa",
  ".lan",
  ".intranet",
  ".corp",
];

function stripBrackets(host: string): string {
  return host.startsWith("[") && host.endsWith("]") ? host.slice(1, -1) : host;
}

function assertAllowedHost(hostname: string): void {
  const host = stripBrackets(hostname.toLowerCase().replace(/\.$/, ""));
  if (!host) throw new UnsafeUrlError(REFUSED);
  if (host === "localhost" || BLOCKED_SUFFIXES.some((s) => host.endsWith(s))) {
    throw new UnsafeUrlError(REFUSED);
  }
  if (isIP(host)) {
    if (isPrivateAddress(host)) throw new UnsafeUrlError(REFUSED);
    return;
  }
  if (!host.includes(".")) {
    throw new UnsafeUrlError("Enter a full domain name such as yourstore.com.");
  }
}

/** Parse a URL and refuse anything that is not a plain public web address. */
export function parsePublicUrl(raw: string): URL {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new UnsafeUrlError("Please enter a valid URL (for example yourstore.com).");
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") throw new UnsafeUrlError(REFUSED);
  if (url.username || url.password) throw new UnsafeUrlError(REFUSED);
  if (url.port && url.port !== "80" && url.port !== "443") throw new UnsafeUrlError(REFUSED);
  assertAllowedHost(url.hostname);
  return url;
}

/** Resolve a hostname now and refuse it if any address is private. */
export async function assertPublicHost(hostname: string): Promise<void> {
  assertAllowedHost(hostname);
  const host = stripBrackets(hostname.toLowerCase().replace(/\.$/, ""));
  if (isIP(host)) return;
  let addresses: LookupAddress[];
  try {
    addresses = await dnsPromises.lookup(host, { all: true, verbatim: true });
  } catch {
    throw new UnsafeUrlError("We could not find that website. Check the address and try again.");
  }
  if (addresses.length === 0 || addresses.some((a) => isPrivateAddress(a.address))) {
    throw new UnsafeUrlError(REFUSED);
  }
}

// The pre-check above can be outrun by a DNS record that changes between the
// check and the request. This lookup runs at connect time, on the exact address
// the socket is about to use, so that gap does not exist.
type LookupCallback = (
  err: NodeJS.ErrnoException | null,
  address: string | LookupAddress[],
  family?: number
) => void;

export const guardedLookup: LookupFunction = (hostname, options, callback) => {
  const lookup = dnsLookup as unknown as (
    host: string,
    opts: object,
    cb: LookupCallback
  ) => void;
  lookup(hostname, options, (err, address, family) => {
    if (err) {
      callback(err, address, family);
      return;
    }
    const list = Array.isArray(address) ? address.map((a) => a.address) : [address];
    if (list.length === 0 || list.some(isPrivateAddress)) {
      callback(new UnsafeUrlError(REFUSED) as NodeJS.ErrnoException, "", undefined);
      return;
    }
    callback(null, address, family);
  });
};

// ---------------------------------------------------------------------------
// Fetch
// ---------------------------------------------------------------------------

export interface SafeFetchOptions {
  /** Total time allowed across all redirects. Default 12 seconds. */
  timeoutMs?: number;
  /** Largest body to read, after decompression. Default 2 MB. */
  maxBytes?: number;
  maxRedirects?: number;
  userAgent?: string;
}

export interface SafeFetchResult {
  status: number;
  finalUrl: string;
  headers: Headers;
  html: string;
  /** True when the body was cut at maxBytes */
  truncated: boolean;
}

const DEFAULT_USER_AGENT =
  "Mozilla/5.0 (compatible; ShopifyAgencyDirectoryGrader/1.0; +https://shopifyagencydirectory.com)";

interface RawResponse {
  status: number;
  headers: IncomingHttpHeaders;
  body: Buffer;
  truncated: boolean;
}

function requestOnce(
  url: URL,
  signal: AbortSignal,
  maxBytes: number,
  userAgent: string
): Promise<RawResponse> {
  return new Promise((resolve, reject) => {
    let settled = false;
    const fail = (err: Error) => {
      if (settled) return;
      settled = true;
      reject(err);
    };

    const client = url.protocol === "https:" ? https : http;
    const req = client.request(
      url,
      {
        method: "GET",
        lookup: guardedLookup,
        signal,
        headers: {
          "User-Agent": userAgent,
          Accept: "text/html,application/xhtml+xml",
          "Accept-Encoding": "gzip, deflate, br",
        },
      },
      (res) => {
        const status = res.statusCode ?? 0;

        // Redirects: the caller reads the Location header and re-validates it.
        if (status >= 300 && status < 400) {
          res.resume();
          settled = true;
          resolve({ status, headers: res.headers, body: Buffer.alloc(0), truncated: false });
          return;
        }

        const encoding = String(res.headers["content-encoding"] ?? "identity").toLowerCase();
        let stream: Readable = res;
        if (encoding === "gzip" || encoding === "x-gzip") stream = res.pipe(zlib.createGunzip());
        else if (encoding === "deflate") stream = res.pipe(zlib.createInflate());
        else if (encoding === "br") stream = res.pipe(zlib.createBrotliDecompress());
        else if (encoding !== "identity" && encoding !== "") {
          res.resume();
          fail(new Error(`Unsupported content encoding ${encoding}`));
          return;
        }

        const chunks: Buffer[] = [];
        let size = 0;
        const finish = (truncated: boolean) => {
          if (settled) return;
          settled = true;
          resolve({ status, headers: res.headers, body: Buffer.concat(chunks), truncated });
        };

        stream.on("data", (chunk: Buffer) => {
          if (settled) return;
          size += chunk.length;
          if (size > maxBytes) {
            // Keep what fits, then stop reading. This also defuses zip bombs
            // because the cap applies after decompression.
            chunks.push(chunk.subarray(0, chunk.length - (size - maxBytes)));
            finish(true);
            res.destroy();
            stream.destroy();
            return;
          }
          chunks.push(chunk);
        });
        stream.on("end", () => finish(false));
        stream.on("error", (err) => fail(err));
        res.on("error", (err) => fail(err));
      }
    );

    req.on("error", (err) => fail(err));
    req.end();
  });
}

function toHeaders(raw: IncomingHttpHeaders): Headers {
  const headers = new Headers();
  for (const [key, value] of Object.entries(raw)) {
    if (value === undefined) continue;
    try {
      headers.set(key, Array.isArray(value) ? value.join(", ") : value);
    } catch {
      /* skip header names or values that Headers rejects */
    }
  }
  return headers;
}

/**
 * GET a public web page. Refuses private and internal addresses at every
 * redirect hop and at connect time, and caps response size and total time.
 * Throws UnsafeUrlError for refused addresses and Error for network problems.
 */
export async function safeFetchHtml(
  rawUrl: string,
  options: SafeFetchOptions = {}
): Promise<SafeFetchResult> {
  const {
    timeoutMs = 12_000,
    maxBytes = 2 * 1024 * 1024,
    maxRedirects = 5,
    userAgent = DEFAULT_USER_AGENT,
  } = options;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    let current = parsePublicUrl(rawUrl);

    for (let hop = 0; hop <= maxRedirects; hop++) {
      await assertPublicHost(current.hostname);
      const raw = await requestOnce(current, controller.signal, maxBytes, userAgent);

      const location = raw.headers.location;
      if (raw.status >= 300 && raw.status < 400 && location) {
        let next: URL;
        try {
          next = new URL(location, current);
        } catch {
          throw new UnsafeUrlError(REFUSED);
        }
        current = parsePublicUrl(next.toString());
        continue;
      }

      return {
        status: raw.status,
        finalUrl: current.toString(),
        headers: toHeaders(raw.headers),
        html: raw.body.toString("utf8"),
        truncated: raw.truncated,
      };
    }
    throw new Error("The site redirected too many times.");
  } catch (err) {
    if (controller.signal.aborted) {
      throw new Error("Request aborted after timeout");
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}
