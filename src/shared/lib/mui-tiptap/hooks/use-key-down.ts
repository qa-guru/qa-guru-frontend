import { useEffect, useRef } from "react";

export default function useKeyDown(
  key: string,
  callback: (event: KeyboardEvent) => void
): void {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (key === event.key) {
        callbackRef.current(event);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [key]);
}
