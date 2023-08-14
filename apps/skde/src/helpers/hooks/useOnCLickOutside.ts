import React from "react";

export const useOnClickOutside = <T extends Element>(
  handler: Function,
  active: boolean,
) => {
  let ref = React.useRef<T>();

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
