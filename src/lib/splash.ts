/**
 * Calls `callback` once the opening screen (`Splash`) starts fading out, so entrance animations play in front of
 * the reader instead of behind it. It runs at once when the screen never showed (`html[data-splash=seen]`, it is
 * `display: none`) or has already gone (a later in-app navigation). Reads the real CSS animation, so it follows
 * any change to its timing, including the shorter one under reduced motion. Returns a cancel function. Browser only.
 */
export function afterSplash(callback: () => void): () => void {
  const fade = document.querySelector(".splash")?.getAnimations()[0];
  const fadeStart = Number(fade?.effect?.getTiming().delay ?? 0);
  const wait = fade && fade.playState !== "finished" ? fadeStart - Number(fade.currentTime ?? 0) : 0;

  if (wait <= 0) {
    callback();
    return () => {};
  }
  const timer = window.setTimeout(callback, wait);
  return () => window.clearTimeout(timer);
}
