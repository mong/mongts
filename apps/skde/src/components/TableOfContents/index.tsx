import React, { type JSX } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { BsCaretDownFill } from "react-icons/bs";

import { ListItem } from "./ListItem";

import styles from "./TableOfContents.module.css";

type TocData = {
  level: number;
  elemID: string;
  children: TocData | [];
}[];

type TableOfContentsProps = {
  lang?: "no" | "nb" | "nn" | "en";
  tocData: TocData;
};

const TocDataToList = ({ tocData, parentID }) => {
  const [expanded, setExpanded] = React.useState<string>("none");

  return (
    <ol className={styles.tocList}>
      {tocData.map((content) => {
        const uniqueID = parentID
          ? `${parentID}_${content.elemID}`
          : `#${content.elemID}`;
        const href = uniqueID.toLowerCase().replace(/\s/g, "-");

        return content.children.length !== 0 ? (
          <ListItem
            key={content.level + content.elemID}
            href={href}
            expanded={expanded}
            setExpanded={setExpanded}
            linkTitle={content.elemID}
          >
            <TocDataToList tocData={content.children} parentID={href} />
          </ListItem>
        ) : (
          <ListItem
            key={content.level + content.elemID}
            expanded={expanded}
            setExpanded={setExpanded}
            href={href}
            linkTitle={content.elemID}
          />
        );
      })}
    </ol>
  );
};

/**
 * Renders a table of contents with support for multiple languages and responsive design.
 *
 * @param {Object} props - React component props.
 * @param {string} [props.lang="no"] - Language for the table of contents title. Supports Norwegian ("no", "nb", "nn") and English ("en").
 * @param {TocData} props.tocData - Data structure representing the table of contents hierarchy.
 *
 * @returns {JSX.Element} A responsive table of contents component with expandable sections for smaller screens.
 */
export const TableOfContents = ({
  lang = "no",
  tocData,
}: TableOfContentsProps): JSX.Element => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const handleChange = () => setExpanded((state) => !state);

  const TOCOrderedList = <TocDataToList tocData={tocData} parentID={null} />;

  return (
    <>
      <div className={styles.toc_large}>
        <div className={styles.tocWrapper}>
          <nav className={`${styles.toc}`}>{TOCOrderedList}</nav>
        </div>
      </div>

      <div className={styles.toc_small_wrapper}>
        <div className={styles.toc_small_content}>
          <Accordion
            sx={{
              backgroundColor: "white",
              boxShadow: 0,
              border: "0.0625rem solid #034584",
            }}
            expanded={expanded}
            onChange={() => handleChange()}
          >
            <AccordionSummary
              sx={{
                fontWeight: "600",
                color: "#034584",
                borderRadius: "4px",
                ":hover": {
                  backgroundColor: "background.paper",
                },
              }}
              expandIcon={<BsCaretDownFill color="#034584" fontSize="large" />}
              aria-controls={`toc-content`}
              id={`toc-header`}
              data-testid={`toc-header`}
            >
              {lang === "en" ? "Table of contents" : "Innholdsoversikt"}
            </AccordionSummary>
            <AccordionDetails data-testid={`toc-content`}>
              <nav className={`${styles.toc}`}>{TOCOrderedList}</nav>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
};
