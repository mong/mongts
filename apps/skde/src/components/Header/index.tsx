import React from "react";
import { SkdeHeader } from "./SkdeHeader";
import { HeaderMiddle } from "./HeaderMiddle";

export const Header = ({ path }: { path: string[] }) => {
  return (
    <>
      <SkdeHeader path={path} />
      <HeaderMiddle
        page={path.at(-1) as "behandlingskvalitet" | "pasientstrømmer"}
      />
    </>
  );
};

export { SkdeHeader } from "./SkdeHeader";
