import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { BsCaretDownFill } from "react-icons/bs";

import { Markdown } from "../Markdown";

type FactBoxProps = {
  boxTitle: string;
  boxContent: string;
  id: string;
  lang: "nb" | "en" | "nn";
};

export const FactBox: React.FC<FactBoxProps> = ({
  boxTitle,
  boxContent,
  id,
  lang,
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const handleChange = () => setExpanded((state) => !state);
  return (
    <div style={{ marginBottom: "10px" }} data-testid="factbox">
      <Accordion
        sx={{
          boxShadow: 1,
          borderBottom: "2px solid #033F85",
        }}
        expanded={expanded}
        onChange={() => handleChange()}
      >
        <AccordionSummary
          sx={{
            backgroundColor: "#E6EEF8",
            fontWeight: "600",
            color: "#033F85",
            ":hover": {
              backgroundColor: "rgba(3,69,132,0.2)",
            },
          }}
          expandIcon={<BsCaretDownFill color="#033F85" fontSize="large" />}
          aria-controls={`${id}-content`}
          id={`${id}-header`}
        >
          {boxTitle}
        </AccordionSummary>
        <AccordionDetails>
          <Markdown lang={lang}>{boxContent}</Markdown>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
