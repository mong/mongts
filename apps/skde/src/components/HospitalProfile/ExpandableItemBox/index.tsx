import { useState, useRef, PropsWithChildren, useEffect } from "react";
import { Button, Box } from "@mui/material";

type ExpandableItemBoxProps = {
  collapsedHeight: number;
  expandedText: string;
  collapsedText: string;
};

export const ExpandableItemBox = (
  props: PropsWithChildren<ExpandableItemBoxProps>,
) => {
  const { collapsedHeight, expandedText, collapsedText } = props;

  const [expanded, setExpanded] = useState<boolean>(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const [overflow, setOverflow] = useState(false);

  const topMargin = 10;

  useEffect(() => {
    if (!contentRef.current || !outerRef.current) {
      return;
    }

    const obs = new ResizeObserver(() => {
      const hasOverflow =
        (outerRef.current?.offsetHeight ?? 0) <
        (contentRef.current?.offsetHeight ?? 0);
      setOverflow(hasOverflow);
    });

    obs.observe(contentRef.current);
    return () => obs.disconnect();
  });

  const handleClick = () => {
    // Scroll the top of the box into view
    const elemCoords = outerRef.current.getBoundingClientRect();

    if (expanded && elemCoords.y < topMargin) {
      window.scrollTo({
        top: scrollY + elemCoords.y - topMargin,
        behavior: "smooth",
      });
    } else {
      if (elemCoords.y < topMargin) {
        window.scrollTo({
          top: window.scrollY + elemCoords.y - topMargin,
          behavior: "smooth",
        });
      }
    }

    setExpanded(!expanded);
  };

  return (
    <Box>
      <Box
        ref={outerRef}
        sx={{
          backgroundColor: "white",
          borderTopLeftRadius: "1.5rem",
          borderTopRightRadius: "1.5rem",
          height: expanded ? "auto" : collapsedHeight,
          overflow: "hidden",
          minHeight: collapsedHeight,
          maskImage:
            !expanded && overflow
              ? "linear-gradient(black, 98%,  transparent)"
              : undefined,
          maskMode: "alpha",
          borderBottomLeftRadius: !expanded && !overflow ? "1.5rem" : "0%",
          borderBottomRightRadius: !expanded && !overflow ? "1.5rem" : "0%",
        }}
      >
        {<div ref={contentRef}>{props.children}</div>}
      </Box>
      {overflow || expanded ? (
        <Button
          sx={{
            backgroundColor: "white",
            borderBottomLeftRadius: "1.5rem",
            borderBottomRightRadius: "1.5rem",
          }}
          fullWidth
          onClick={handleClick}
        >
          {expanded ? expandedText : collapsedText}
        </Button>
      ) : null}
    </Box>
  );
};
