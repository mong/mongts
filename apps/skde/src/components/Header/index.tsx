import React from "react";
import { HeaderTop, BreadCrumbPath } from "./HeaderTop";
import { HeaderMiddle, HeaderData } from "./HeaderMiddle";
import { Breakpoint } from "@mui/material";

type HeaderProps = {
  headerData: HeaderData;
  breadcrumbs: BreadCrumbPath;
  bgcolor?: string;
  maxWidth?: false | Breakpoint;
};

export const Header = (props: HeaderProps) => {
  return (
    <>
      <HeaderTop breadcrumbs={props.breadcrumbs} maxWidth={props.maxWidth} />
      <HeaderMiddle
        bgcolor={props.bgcolor}
        headerData={props.headerData}
        maxWidth={props.maxWidth ? props.maxWidth : false}
      />
    </>
  );
};

export { HeaderTop } from "./HeaderTop";
export type { BreadCrumbPath } from "./HeaderTop";
export type { HeaderData } from "./HeaderMiddle";
