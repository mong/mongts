import React from "react";
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

const TocDataToList = (tocData: TocData, parentID?: string) => {
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
            {TocDataToList(content.children, href)}
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

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  lang = "no",
  tocData,
}) => {
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const handleChange = () => setExpanded((state) => !state);

  const TOCOrderedList = TocDataToList(tocData);

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
              <nav className={`${styles.toc}`}>{TOCOrderedList}</nav>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </>
  );
};
