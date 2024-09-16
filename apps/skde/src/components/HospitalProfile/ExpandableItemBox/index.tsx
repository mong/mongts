import { useState, useRef, PropsWithChildren } from "react";
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
  const ref = useRef(null);

  const topMargin = 10;

  const handleClick = () => {
    // Scroll the top of the box into view
    const elemCoords = ref.current.getBoundingClientRect();

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
    <Box ref={ref}>
      <Box
        sx={{
          backgroundColor: "white",
          borderTopLeftRadius: "24px",
          borderTopRightRadius: "24px",
          height: expanded ? "auto" : collapsedHeight,
          overflow: "hidden",
          minHeight: collapsedHeight,
          maskImage: !expanded
            ? "linear-gradient(black, 90%,  transparent)"
            : undefined,
          maskMode: "alpha",
        }}
      >
        {props.children}
      </Box>
      <Button
        sx={{
          backgroundColor: "white",
          borderBottomLeftRadius: "24px",
          borderBottomRightRadius: "24px",
        }}
        fullWidth
        onClick={handleClick}
      >
        {expanded ? expandedText : collapsedText}
      </Button>
    </Box>
  );
};
