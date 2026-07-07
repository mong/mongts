import { useCallback, useEffect, useState } from "react";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  // Show button when page is scrolled down past 300px
  const toggleVisibility = useCallback((): void => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, []);

  // Set the top coordinate to 0 and make scrolling behavior smooth
  const scrollToTop = (): void => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, [toggleVisibility]);

  return (
    <div className="fixed bottom-16 right-16 z-50">
      <button
        type="button"
        onClick={scrollToTop}
        className={`
          ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"}
          flex items-center justify-center h-12 w-12 rounded-full 
          bg-brand-primary-400 hover:bg-brand-primary-500 text-white
          transition-all duration-300 ease-in-out transform focus:outline-none focus:ring-2 focus:ring-brand-primary-500 focus:ring-offset-2
        `}
        aria-label="Scroll to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
          aria-label="Arrow pointing up"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};
