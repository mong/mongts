import { useEffect, useRef } from "react";

export const useEventListener = (
  eventName: string,
  handler: (event: KeyboardEvent) => void,
  targetElement = global,
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const listenerRef = useRef<any>();

  useEffect(() => {
    listenerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    const isSupported = targetElement && targetElement.addEventListener;
    if (!isSupported) return;
    const eventListener = (event: Event) =>
      !!listenerRef.current && listenerRef.current(event);
    targetElement.addEventListener(eventName, eventListener);
    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, targetElement]);
};

export default useEventListener;
