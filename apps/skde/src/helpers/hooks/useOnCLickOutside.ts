import React from "react";

/**
 * useOnClickOutside hook. Returns a ref that should be passed to the element
 * that should trigger the on click outside event. The hook will call the
 * `handler` function when the element is clicked outside of.
 * @param {() => void} handler - The function to call when the element is clicked outside of.
 * @param {boolean} active - Whether the effect should be active or not.
 * @returns {React.MutableRefObject<T>} - The ref that should be passed to the element.
 */
export const useOnClickOutside = <T extends Element>(
  handler: () => void,
  active: boolean,
) => {
  const ref = React.useRef<T>();

  React.useEffect(() => {
    const clickHandler = (event) => {
      if (!ref.current) return;
      if (!ref.current.contains(event.target)) {
        handler();
      }
    };
    if (active) {
      document.addEventListener("mousedown", clickHandler);
    }
    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, [active]);

  return ref;
};
