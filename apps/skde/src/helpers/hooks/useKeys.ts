import React from "react";

/**
 * Registers an event listener for the given keys on the given target element.
 *
 * Will only call the handler if the event is triggered by one of the keys in the given array.
 *
 * @param key The keys to listen for
 * @param eventName The event name to listen for (e.g. 'keydown', 'keyup')
 * @param handler The function to call when the event is triggered
 * @param targetElement The element to listen on. Defaults to the global object (window in a browser)
 */
export const useKeys = (
  key: string[],
  eventName: string,
  handler: (event: KeyboardEvent) => void,
  targetElement = global,
) => {
  const listenerRef = React.useRef<(event: KeyboardEvent) => void>();

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
