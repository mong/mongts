import { useEffect } from "react";
import { ArrayParam, useQueryParam } from "use-query-params";
import usePostMessageHandler from "./usePostMessageHandler";
import useSiblingFrames from "./useSiblingFrames";

export function useBohfSync() {
  const { siblingFrames, domain } = useSiblingFrames();
  const [message, sendMessage] = usePostMessageHandler(siblingFrames, domain);
  const [bohfs, setBohfs] = useQueryParam("bohf", ArrayParam);

  useEffect(() => {
    sendMessage({ type: "bohfs", data: bohfs });
  }, [bohfs, sendMessage]);

  useEffect(() => {
    if (message && message.type === "bohfs") {
      setBohfs(message.data);
    }
  }, [message, setBohfs]);

  return { bohfs, setBohfs };
}
