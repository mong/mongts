import React, { useState } from "react";
import { CarouselItemProps } from "./CarouelItem";
import { CarouselButtons } from "./CarouselButtons";
import { BiBarChart, BiLineChart, BiMapPin } from "react-icons/bi";
import { VscTable } from "react-icons/vsc";
import { AiOutlineInfoCircle } from "react-icons/ai";

import styles from "./Carousel.module.css";
import { PopUp } from "../PopUp";
import { Markdown } from "../Markdown";

type CarouselProps = {
  active?: number;
  selection?: string;
  popupState?: React.Dispatch<React.SetStateAction<boolean>>;
  lang?: "nb" | "en" | "nn";
  children: // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | React.ReactElement<CarouselItemProps & React.RefObject<any>>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    | Array<React.ReactElement<CarouselItemProps & React.RefObject<any>>>;
};

const chartIcons = {
  barchart: <BiBarChart color="white" size="28px" />,
  linechart: <BiLineChart color="white" size="28px" />,
  table: <VscTable color="white" size="28px" />,
  map: <BiMapPin color="white" size="28px" />,
};

const SelectionBtn = ({ lang }: { lang?: "nb" | "en" | "nn" }) => {
  return (
    <button className={styles.selectionBtn} data-testid="selectionBtn">
      <AiOutlineInfoCircle color="#033F85" />
      <span>
        {" "}
        {lang === "nn"
          ? "Utval"
          : lang === "en"
            ? "Patient selection"
            : "Utvalg"}
      </span>
    </button>
  );
};

export const Carousel = ({
  active,
  children,
  selection,
  lang,
  popupState,
}: CarouselProps) => {
  const [activeComp, setActiveComp] = useState(active ?? 0);

  const options = React.Children.map(
    children,
    (child: React.ReactElement<CarouselItemProps>, i: number) => ({
      value: i,
      label: child ? child.props.label : `figur ${i + 1}`,
      icon: chartIcons[child.props.label],
    }),
  );

  return (
    <div className={styles.carouselWrapper}>
      <CarouselButtons
        options={options}
        activeCarousel={activeComp}
        onClick={(i) => setActiveComp(i)}
      />
      <div className={styles.carousel}>{children[activeComp]}</div>
      <div style={{ alignSelf: "flex-start" }}>
        {selection && (
          <PopUp
            innerContentStyle={{
              position: "relative",
              width: "95%",
              maxWidth: "1216px",
              padding: "30px 30px 100px 30px",
              margin: "auto",
            }}
            popupState={popupState}
            btnComponent={() => <SelectionBtn lang={lang} />}
          >
            <Markdown lang={lang}>{selection}</Markdown>
          </PopUp>
        )}
      </div>
    </div>
  );
};
