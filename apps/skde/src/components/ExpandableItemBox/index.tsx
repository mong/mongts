import { useState, useRef, PropsWithChildren } from "react";
import { Button, Box } from "@mui/material";

export const ExpandableItemBox = (props: PropsWithChildren) => {
  const maxHeight = 800;
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
          height: expanded ? "auto" : maxHeight,
          overflow: "clip",
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
        {expanded ? "Se mindre" : "Se mer"}
      </Button>
    </Box>
  );
};