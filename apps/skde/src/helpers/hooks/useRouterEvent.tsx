import React from "react";
import { useRouter } from "next/router";

export const useRouterEvent = (event, cb) => {
  const { events } = useRouter();

  React.useEffect(() => {
    events.on(event, cb);
    return () => {
      events.off(event, cb);
    };
  }, [cb, event]);
};
