import { useState, useEffect, useCallback } from "react";

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
