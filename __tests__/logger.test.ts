/**
 * Smoke tests for the production-safe logger
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("logError", () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    vi.restoreAllMocks();
  });

  it("logs to console.error in development", async () => {
    process.env.NODE_ENV = "development";
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { logError } = await import("@/lib/logger");
    logError("test-label", "some error");

    expect(spy).toHaveBeenCalledWith("[test-label]", "some error");
  });

  it("suppresses console.error in production", async () => {
    process.env.NODE_ENV = "production";
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { logError } = await import("@/lib/logger");
    logError("test-label", "some error");

    expect(spy).not.toHaveBeenCalled();
  });
});

describe("silentCatch", () => {
  const originalEnv = process.env.NODE_ENV;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    process.env.NODE_ENV = originalEnv;
    vi.restoreAllMocks();
  });

  it("logs to console.error in development", async () => {
    process.env.NODE_ENV = "development";
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { silentCatch } = await import("@/lib/logger");
    silentCatch(new Error("oops"));

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it("suppresses console.error in production", async () => {
    process.env.NODE_ENV = "production";
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});

    const { silentCatch } = await import("@/lib/logger");
    silentCatch(new Error("oops"));

    expect(spy).not.toHaveBeenCalled();
  });
});
