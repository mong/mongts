import React, { type JSX } from "react";
import styles from "./CarouselButtons.module.css";

type CarouselButtonsProps = {
  options: {
    value: number;
    label: string;
    icon: JSX.Element;
  }[];
  activeCarousel: number;
  onClick?: (nr: number) => void;
};

export const CarouselButtons = ({
  options,
  onClick,
  activeCarousel,
}: CarouselButtonsProps) => {
  return (
    <ul className={styles.buttonscontainer}>
      {options.map((optn, i) => {
        return (
          <li className={styles.bulletcontainer} key={i}>
            <button
              aria-label={"show item " + i}
              className={`${styles.bullet} ${
                i === activeCarousel ? styles.active : ""
              }`}
              onClick={() => onClick && onClick(i)}
              data-testid={"carouselbutton_" + i}
            >
              {optn.icon}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
