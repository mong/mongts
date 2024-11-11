import { useEffect, useState } from "react";
import getSiblingFrames from "../functions/getSiblingFrames";

/**
 * A custom React hook that retrieves sibling frames of the current window
 * and the domain of the current window's location.
 *
 * @returns An object containing:
 *  - siblingFrames: An array of Window objects representing sibling frames.
 *  - domain: A string representing the domain of the current window's location.
 */
export default function useSiblingFrames() {
  const [siblingFrames, setSiblingFrames] = useState<Window[]>([]);
  const [domain, setDomain] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSiblingFrames(getSiblingFrames(window));
      setDomain(window.location.origin);
    }
  }, []);

  return { siblingFrames, domain };
}
