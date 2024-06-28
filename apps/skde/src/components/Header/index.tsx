import React from "react";
import HeaderTop from "./HeaderTop";
import { HeaderMiddle } from "./HeaderMiddle";

export const Header = ({ path }: { path: string[] }) => {
  return (
    <React.Fragment>
      <HeaderTop path={path} />
      <HeaderMiddle page={path.at(-1)} />
    </React.Fragment>
  );
};

export { HeaderTop } from "./HeaderTop";
