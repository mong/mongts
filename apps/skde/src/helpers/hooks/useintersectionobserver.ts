import { useState, useEffect } from "react";

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
      { rootMargin }
    );

    element && observer.observe(element);

    return () => observer.unobserve(element);
  }, [isVisible]);

  return isVisible;
};
