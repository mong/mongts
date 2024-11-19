import React from "react";
import Link from "next/link";
import Image from "next/image";

import { imgLoader } from "qmongjs";
import classNames from "./Header.module.css";
import { Box } from "@mui/material";

export const LangButton = ({ lang }: { lang: "no" | "en" }) => {
  return (
    <div className={classNames.lang}>
      <div
        className={`${classNames.no} ${
          lang === "no" ? classNames.active : undefined
        }`}
        data-testid="buttonNo"
      >
        <Link href={`/helseatlas`}>NO</Link>
      </div>
      <div
        className={`${classNames.eng} ${
          lang === "en" ? classNames.active : undefined
        }`}
        data-testid="buttonEng"
      >
        <Link href={`/helseatlas/en`}>ENG</Link>
      </div>
    </div>
  );
};

export const Header = ({ lang }: { lang: "no" | "en" }) => {
  return (
    <header className={`${classNames.headerContainer}`}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <div className={classNames.headerLogo}>
          <Link
            href={`${lang === "en" ? "/helseatlas/en" : "/helseatlas"}`}
            rel="home"
          >
            <Image
              loader={imgLoader}
              src={`/helseatlas/img/logos/helseatlas.svg`}
              alt="Hjem"
              width={186}
              height={47}
            />
          </Link>
        </div>
        <LangButton lang={lang} />
      </Box>
    </header>
  );
};
