/** Any origin works as the base: only paths that stay on it are accepted. */
const BASE = "http://same-origin.invalid";

/**
 * Only same-site paths are allowed as post-login destinations (no open redirects). The path is parsed the way a
 * browser parses a Location header, which drops tabs and newlines and reads "\" as "/": a check on the raw string
 * alone let "/\t/evil.com" through, and the browser turned it into "//evil.com".
 */
export function safeNextPath(next: unknown, fallback = "/account"): string {
  if (typeof next !== "string" || !next.startsWith("/")) return fallback;
  try {
    const url = new URL(next, BASE);
    return url.origin === BASE ? `${url.pathname}${url.search}${url.hash}` : fallback;
  } catch {
    return fallback;
  }
}
