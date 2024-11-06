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

/**
 * A list item for the table of contents component.
 *
 * @param {ListItemProps} props The props for the list item.
 * @prop {React.ReactNode} [children] The children of the list item.
 * @prop {string} href The href of the link.
 * @prop {string} linkTitle The title of the link.
 * @prop {string} expanded The expanded state of the list item.
 * @prop {React.Dispatch<React.SetStateAction<string>>} setExpanded The function to set the expanded state.
 *
 * @returns The list item component.
 */
export const ListItem = ({
  children,
  href,
  linkTitle,
  expanded,
  setExpanded,
}: ListItemProps) => {
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
