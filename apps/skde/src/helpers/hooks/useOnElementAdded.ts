import { useEffect } from "react";

/**
 * A hook that waits for an element with the given targetId to be added to the
 * DOM, and then calls the callback with the targetId as an argument.
 *
 * If the queriesReady argument is true, then the hook will try to find the
 * element immediately and call the callback if it is found. Otherwise, it will
 * wait for the element to be added to the DOM and call the callback then.
 *
 * The callback will only be called once, either immediately if the element is
 * already available, or when the element is added to the DOM.
 *
 * @param targetId The ID of the element to wait for
 * @param queriesReady Whether the hook should try to find the element immediately
 * @param callback The function to call when the element is added
 */
function useOnElementAdded(
  targetId: string,
  queriesReady: boolean,
  callback: (targetId: string) => boolean,
) {
  useEffect(() => {
    if (queriesReady && targetId) {
      // If the target element is already available, then let the callback
      // handle it directly.
      const foundTarget = callback(targetId);

      if (!foundTarget) {
        const observerCallback: MutationCallback = (mutationsList) => {
          for (const mutation of mutationsList) {
            if (mutation.type === "childList") {
              // Check if the added nodes contain the element with the target ID
              mutation.addedNodes.forEach((node) => {
                if (
                  node instanceof HTMLElement && // Ensure the node is an HTMLElement
                  node.id === targetId // Check if the element has the target ID
                ) {
                  callback(targetId);
                }
              });
            }
          }
        };

        const observer = new MutationObserver(observerCallback);
        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
      }
    }
  });
}

export default useOnElementAdded;
