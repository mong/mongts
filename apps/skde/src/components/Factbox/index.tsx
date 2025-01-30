import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { BsCaretDownFill } from "react-icons/bs";

import { Markdown } from "../Markdown";
import { Atlas } from "../../types";

type FactBoxProps = {
  atlas: Atlas;
  boxTitle: string;
  boxContent: string;
  id: string;
};

export const FactBox = ({ atlas, boxTitle, boxContent, id }: FactBoxProps) => {
  return (
    <div style={{ marginBottom: "0.625rem" }} data-testid="factbox">
      <Accordion
        sx={{
          boxShadow: 1,
          borderBottom: "0.125rem solid #033F85",
        }}
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
          <Markdown lang={atlas.lang}>{boxContent}</Markdown>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
