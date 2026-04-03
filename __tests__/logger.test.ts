/**
 * Smoke tests for the production-safe logger
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("logError", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("logs to console.error in development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { logError } = await import("@/lib/logger");
    logError("test-label", "some error");

    expect(spy).toHaveBeenCalledWith("[test-label]", "some error");
  });

  it("suppresses console.error in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { logError } = await import("@/lib/logger");
    logError("test-label", "some error");

    expect(spy).not.toHaveBeenCalled();
  });
});

describe("silentCatch", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
  });

  it("logs to console.error in development", async () => {
    vi.stubEnv("NODE_ENV", "development");
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { silentCatch } = await import("@/lib/logger");
    silentCatch(new Error("oops"));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("suppresses console.error in production", async () => {
    vi.stubEnv("NODE_ENV", "production");
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { silentCatch } = await import("@/lib/logger");
    silentCatch(new Error("oops"));

    expect(spy).not.toHaveBeenCalled();
  });
});
