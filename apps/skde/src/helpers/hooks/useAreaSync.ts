import { useEffect } from "react";
import { ArrayParam, useQueryParam } from "use-query-params";
import usePostMessageHandler from "./usePostMessageHandler";
import useSiblingFrames from "./useSiblingFrames";

/**
 * A hook that synchronizes the query parameter "area" across sibling
 * windows. It sends out the current value of "area" to other windows and
 * updates the local value when receiving a message from another window.
 *
 * @returns An array where the first element is the current value of "area"
 *          and the second element is a setter function to update the value.
 */
export function useAreaSync() {
  const { siblingFrames, domain } = useSiblingFrames();
  const [message, sendMessage] = usePostMessageHandler(siblingFrames, domain);
  const [areas, setAreas] = useQueryParam("area", ArrayParam);

  useEffect(() => {
    sendMessage({ type: "areas", data: areas });
  }, [areas, sendMessage]);

  useEffect(() => {
    if (message && message.type === "areas") {
      setAreas(message.data);
    }
  }, [message, setAreas]);

  return { areas, setAreas };
}
