import React, { PropsWithChildren } from "react";
import { HeaderTop, BreadCrumbPath } from "./HeaderTop";
import { HeaderMiddle } from "./HeaderMiddle";
import { Breakpoint } from "@mui/material";

type HeaderProps = PropsWithChildren<{
  title: string;
  breadcrumbs: BreadCrumbPath;
  children?: React.ReactNode;
  bgcolor?: string;
  maxWidth?: false | Breakpoint;
}>;

export const Header = (props: HeaderProps) => {
  return (
    <>
      <HeaderTop breadcrumbs={props.breadcrumbs} maxWidth={props.maxWidth} />
      <HeaderMiddle
        bgcolor={props.bgcolor}
        title={props.title}
        maxWidth={props.maxWidth ? props.maxWidth : false}
        children={props.children}
      />
    </>
  );
};

export { HeaderTop } from "./HeaderTop";
export type { BreadCrumbPath } from "./HeaderTop";
