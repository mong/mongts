import React, { useState } from "react";
import { useIntersectionByID } from "../../helpers/hooks/useintersectionobserver";
import style from "./ListItem.module.css";

type ListItemProps = {
  children: React.ReactNode;
  expanded?: number | "none" | "all";
  setExpanded?: React.Dispatch<React.SetStateAction<number | "none" | "all">>;
  i?: number;
};

export const ListItem: React.FC<ListItemProps> = ({
  children,
  expanded,
  setExpanded,
  i,
}) => {
  const [expandedChild, setExpandedChild] = React.useState<
    number | "none" | "all"
  >("none");

  const ATag: React.HTMLProps<HTMLAnchorElement>[] = React.Children.map(
    children,
    (child) => {
      if (React.isValidElement(child)) {
        if (child.type === "a") {
          return child.props;
        }
      }
    }
  );
  const elemID: string = (ATag[0].href ?? "").replace("#", "");
  const isVisbile = useIntersectionByID(elemID, "0px");

  const nestedChildren = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      if (child.type !== "a") {
        return React.cloneElement(child, {
          expanded: expandedChild,
          setExpanded: setExpandedChild,
        });
      }
    }
  }).map((child, index) => {
    return React.cloneElement(child, {
      i: index,
    });
  });

  return (
    <li
      className={`${style.tocListItem} ${isVisbile ? style.active : isVisbile}`}
      data-testid="tocItem"
    >
      <a
        {...ATag[0]}
        onClick={() => {
          if (i) {
            setExpanded((state) => {
              return state === i ? "none" : i;
            });
          }
        }}
      />
      {(expanded === i || expanded === "all") && nestedChildren}
    </li>
  );
};
