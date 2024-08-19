import { useEffect } from "react";

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
        // The element didn't exist, observe if it shows up and trigger callback
        console.log(
          `Didn't find the element with id "${targetId}" in the DOM, setting up observer`,
        );

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
            } else {
              console.log(
                `The element with id "${targetId}" was already present in the DOM, no need for observer`,
              );
            }
          }
        };

        const observer = new MutationObserver(observerCallback);
        observer.observe(document.body, { childList: true, subtree: true });
        return () => observer.disconnect();
      }
    } else {
      console.log(
        `Not scrolling. Target ID was ${targetId}. Queries ${queriesReady ? "" : "not "}ready.`,
      );
    }
  });
}

export default useOnElementAdded;
