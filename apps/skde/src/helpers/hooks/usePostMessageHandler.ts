import { useState, useEffect, useCallback } from "react";

/**
 * A hook to send and receive post messages between the current window and
 * given target windows.
 *
 * @param {Window[]} targetWindows The windows to send messages to
 * @param {string | null} domain The domain to check the origin of incoming
 *   messages against. If null, the origin of incoming messages is not checked.
 * @returns {Array<unknown, (msg: unknown) => void>} A tuple where the first
 *   element is the last message received and the second element is a function
 *   to send a message to the target windows.
 */
export default function usePostMessageHandler(
  targetWindows: Window[],
  domain: string | null,
) {
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== domain) {
        console.warn(`Message origin not allowed: ${event.origin}`);
        return;
      }
      setMessage(event.data);
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [domain]);

  const sendMessage = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (msg: any) => {
      if (targetWindows) {
        targetWindows.forEach((window) => {
          window.postMessage(msg, domain);
        });
      }
    },
    [targetWindows, domain],
  );

  return [message, sendMessage];
}
