import { useEffect } from "react";
import { ArrayParam, useQueryParam } from "use-query-params";
import usePostMessageHandler from "./usePostMessageHandler";
import useSiblingFrames from "./useSiblingFrames";

/**
 * A hook that synchronizes the query parameter "bohf" across sibling
 * windows. It sends out the current value of "bohf" to other windows and
 * updates the local value when receiving a message from another window.
 *
 * @returns An array where the first element is the current value of "bohf"
 *          and the second element is a setter function to update the value.
 */
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
