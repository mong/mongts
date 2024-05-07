import React from "react";
import { useIntersectionByID } from "../../helpers/hooks/useintersectionobserver";
import style from "./ListItem.module.css";

type ListItemProps = {
  children?: React.ReactNode;
  expanded?: string;
  setExpanded?: React.Dispatch<React.SetStateAction<string>>;
  href: string;
  linkTitle: string;
  i?: string;
};

export const ListItem: React.FC<ListItemProps> = ({
  children,
  href,
  linkTitle,
  expanded,
  setExpanded,
}) => {
  const isVisbile = useIntersectionByID(href.replace("#", ""), "0px");

  return (
    <li
      className={`${style.tocListItem} ${isVisbile ? style.active : isVisbile}`}
      data-testid="tocItem"
    >
      <a
        href={href}
        onClick={() => {
          setExpanded((state) => (state === href ? "none" : href));
        }}
        data-testid={`toc_a_${href}`}
      >
        {linkTitle}
      </a>
      {(expanded === href || expanded === "all") && children}
    </li>
  );
};
