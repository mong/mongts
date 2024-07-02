import React from "react";
import { SkdeHeader } from "./SkdeHeader";
import { HeaderMiddle } from "./HeaderMiddle";
import { BreadCrumbPath } from "./SkdeHeader";

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
      <SkdeHeader breadcrumbs={breadcrumbs} />
      <HeaderMiddle page={page} />
    </>
  );
};

export { SkdeHeader } from "./SkdeHeader";
