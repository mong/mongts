import React from "react";
import { HeaderTop, BreadCrumbPath } from "./HeaderTop";
import { HeaderMiddle, HeaderData } from "./HeaderMiddle";

export type HeaderProps = {
  headerData: HeaderData;
  breadcrumbs: BreadCrumbPath;
  children?: React.ReactNode;
  bgcolor?: string;
};

export const Header = (props: HeaderProps) => {
  return (
    <>
      <HeaderTop breadcrumbs={props.breadcrumbs} />
      <HeaderMiddle children={props.children} bgcolor={props.bgcolor} headerData={props.headerData} />
    </>
  );
};

export { HeaderTop } from "./HeaderTop";
export type { BreadCrumbPath } from "./HeaderTop";
export type { HeaderData } from "./HeaderMiddle";