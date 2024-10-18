import { useEffect, useState } from "react";
import getSiblingFrames from "../functions/getSiblingFrames";

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
