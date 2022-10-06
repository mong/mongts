import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { BsCaretDownFill } from "react-icons/bs";

import styles from "./toc.module.css";

export const TableOfContents = ({ children, lang = "no" }) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const handleChange = () => setExpanded((state) => !state);

  return (
    <>
      <div className={styles.toc_large}>
        <div className={styles.tocWrapper}>
          <nav className={`${styles.toc}`}>{children}</nav>
        </div>
      </div>

      <div className={styles.toc_small_wrapper}>
        <div className={styles.toc_small_content}>
          <Accordion
            sx={{
              boxShadow: 0,
              border: "1px solid #034584",
            }}
            expanded={expanded}
            onChange={() => handleChange()}
          >
            <AccordionSummary
              sx={{
                fontWeight: "600",
                color: "#034584",
                ":hover": {
                  backgroundColor: "rgba(3,69,132,0.05)",
                },
              }}
              expandIcon={<BsCaretDownFill color="#034584" fontSize="large" />}
              aria-controls={`toc-content`}
              id={`toc-header`}
            >
              {lang === "en" ? "Table of contents" : "Innholdsoversikt"}
            </AccordionSummary>
            <AccordionDetails>
              <nav className={`${styles.toc}`}>{children}</nav>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
};
