import React from "react";
import HeaderTop from "./HeaderTop";
import { HeaderMiddle } from "./HeaderMiddle";

type HeaderProps = {
  page: "behandlingskvalitet" | "pasientstrømmer";
};

export const Header = (props: HeaderProps) => {
  const { page } = props;

  return (
    <React.Fragment>
      <HeaderTop page={page} />
      <HeaderMiddle page={page} />
    </React.Fragment>
  );
};
