import React from "react";
import { HeaderTop, BreadCrumbPath } from "./HeaderTop";
import { HeaderMiddle } from "./HeaderMiddle";

type HeaderProps = {
  page:
    | "behandlingskvalitet"
    | "sykehusprofil"
    | "helseatlas"
    | "pasientstrømmer";
  breadcrumbs: BreadCrumbPath;
};

export const Header = (props: HeaderProps) => {
  const { page, breadcrumbs } = props;

  return (
    <>
      <HeaderTop breadcrumbs={breadcrumbs} />
      <HeaderMiddle page={page} />
    </>
  );
};

export { HeaderTop } from "./HeaderTop";
