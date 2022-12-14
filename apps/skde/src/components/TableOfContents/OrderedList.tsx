import { ListItem } from "@mui/material";
import React from "react";
import style from "./OrderedList.module.css";

type OrderedListProps = {
  children: React.ReactNode;
};
export const OrderedList: React.FC<OrderedListProps> = ({ children }) => {
  const [expanded, setExpanded] = React.useState<number | "none" | "all">(
    "none"
  );

  return (
    <ol className={style.tocList}>
      {React.Children.map(children, (child, i) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            expanded,
            setExpanded,
            i,
          });
        }
      })}
    </ol>
  );
};
