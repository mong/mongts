import React from "react";
import { useRouter } from "next/router";

/**
 * Subscribe to a Next.js router event and call the callback function when the
 * event is triggered.
 *
 * @param {string} event - The name of the event to subscribe to.
 * @param {function} cb - The callback function to call when the event is
 * triggered.
 *
 * @example
 * useRouterEvent("routeChangeStart", (url) => {
 *   console.log("Route change started: ", url);
 * });
 *
 * @returns {void}
 */
export const useRouterEvent = (event, cb) => {
  const { events } = useRouter();

  React.useEffect(() => {
    events.on(event, cb);
    return () => {
      events.off(event, cb);
    };
  }, [cb, event]);
};
