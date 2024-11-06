import { useState, useEffect } from "react";

/**
 * Uses the IntersectionObserver API to watch the element with the given
 * `elementID` and set the `isVisible` state to true when the element is
 * visible in the viewport and false when it is not.
 *
 * @param {string} elementID The ID of the element to watch
 * @param {string} rootMargin The root margin to watch, see
 *   https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserver/rootMargin
 * @returns {boolean} True if the element is visible in the viewport, false
 *   otherwise
 */
export const useIntersectionByID = (elementID: string, rootMargin: string) => {
  const [isVisible, setVisibility] = useState<boolean>(false);

  useEffect(() => {
    const element = document.getElementById(elementID);
    if (!element) {
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisibility(entry.isIntersecting);
      },
      { rootMargin, threshold: 0.1 },
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    element && observer.observe(element);

    return () => observer.unobserve(element);
  }, [isVisible]);

  return isVisible;
};
