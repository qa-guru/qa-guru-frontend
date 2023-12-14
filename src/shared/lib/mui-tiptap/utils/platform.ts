let isMacResult: boolean | undefined;
let isTouchDeviceResult: boolean | undefined;

export function isMac(): boolean {
  if (isMacResult === undefined) {
    isMacResult = navigator.platform.includes("Mac");
  }
  return isMacResult;
}

export function getModShortcutKey(): string {
  return isMac() ? "⌘" : "Ctrl";
}

export function isTouchDevice(): boolean {
  if (isTouchDeviceResult === undefined) {
    isTouchDeviceResult =
      (window && "ontouchstart" in window) ||
      navigator.maxTouchPoints > 0 ||
      // @ts-expect-error: msMaxTouchPoints is IE-specific, so needs to be ignored
      navigator.msMaxTouchPoints > 0;
  }

  return isTouchDeviceResult;
}
