import React from "react";

export const useKeys = (
  key: string[],
  eventName: string,
  handler: Function,
  targetElement = global
) => {
  const listenerRef = React.useRef<Function>();

  React.useEffect(() => {
    listenerRef.current = handler;
  }, [handler]);

  React.useEffect(() => {
    if (!listenerRef.current) return;
    const isSupported = targetElement && targetElement.addEventListener;
    if (!isSupported) return;
    const eventListener = (event: KeyboardEvent) =>
      listenerRef.current &&
      key.includes(event.key) &&
      listenerRef.current(event);
    targetElement.addEventListener(eventName, eventListener);
    return () => {
      targetElement.removeEventListener(eventName, eventListener);
    };
  }, [eventName, targetElement]);
};
