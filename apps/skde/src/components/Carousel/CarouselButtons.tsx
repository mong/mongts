import React from "react";
import styles from "./CarouselButtons.module.css";

type CarouselButtonsProps = {
  options: {
    value: number;
    label: string;
    icon: JSX.Element;
  }[];
  activeCarousel: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (nr: number) => any;
};

export const CarouselButtons = ({
  options,
  onClick,
  activeCarousel,
}: CarouselButtonsProps) => {
  const clickHandler = (index) => {
    if (onClick) {
      onClick(index);
    }
  };
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
              onClick={() => clickHandler(i)}
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
