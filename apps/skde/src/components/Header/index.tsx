import React, { PropsWithChildren } from "react";
import { HeaderTop, BreadCrumbPath } from "./HeaderTop";
import { HeaderMiddle } from "./HeaderMiddle";
import { Breakpoint } from "@mui/material";

type HeaderProps = PropsWithChildren<{
  title: string;
  breadcrumbs: BreadCrumbPath;
  menu?: React.ReactNode;
  bgcolor?: string;
  maxWidth?: false | Breakpoint;
}>;

/**
 * A composite header component that includes the top and middle sections
 * of the page. It displays breadcrumbs and a title, and can optionally
 * include custom children content and specify background color and
 * maximum width.
 *
 * @param {HeaderProps} props - The properties for the Header component.
 * @param {string} props.title - The title to be displayed in the header.
 * @param {BreadCrumbPath} props.breadcrumbs - The breadcrumb path for navigation.
 * @param {React.ReactNode} [props.children] - Optional children content to be displayed below the title.
 * @param {string} [props.bgcolor] - Optional background color for the middle section of the header.
 * @param {false | Breakpoint} [props.maxWidth] - Optional maximum width for the header sections.
 */
export const Header = (props: HeaderProps) => {
  return (
    <>
      <HeaderTop
        breadcrumbs={props.breadcrumbs}
        maxWidth={props.maxWidth}
        menu={props.menu}
      />
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
