import style from "./chartrowdescription.module.css";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { ExpandMore } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  description_title?: string;
  description_text: string;
  delivery_time?: Date;
}

const remarkPlugins = [remarkGfm];

export const ChartRowDescription = ({
  description_text,
  description_title = "Om kvalitetsindikatoren",
  delivery_time,
}: Props) => {
  return (
    <div className={style.description_container}>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMore />}>
          <div className={style.description_title}>{description_title}</div>
        </AccordionSummary>
        <AccordionDetails>
          <>
            <ReactMarkdown
              remarkPlugins={remarkPlugins}
              components={{
                p({ children }) {
                  return <p style={{ margin: 0 }}>{children}</p>;
                },
                a({ href, children }) {
                  return (
                    <a
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: "#006492" }}
                    >
                      {children}
                    </a>
                  );
                },
              }}
            >
              {description_text}
            </ReactMarkdown>
            {delivery_time && (
              <p>
                Disse dataene ble lastet opp{" "}
                {delivery_time.toLocaleString("no-NO", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  timeZone: "CET",
                })}
                .
              </p>
            )}
          </>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};
