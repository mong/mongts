import { useEffect } from "react";

function useOnElementAdded(
  targetId: string,
  queriesReady: boolean,
  callback: (targetId: string) => void,
) {
  useEffect(() => {
    // Define the callback function for the MutationObserver
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

    if (queriesReady) {
      // Set up the MutationObserver
      const observer = new MutationObserver(observerCallback);

      // Start observing the document body for changes in the DOM
      observer.observe(document.body, { childList: true, subtree: true });

      // Cleanup the observer on component unmount
      return () => observer.disconnect();
    }
  }, [targetId, queriesReady, callback]);
}

export default useOnElementAdded;
