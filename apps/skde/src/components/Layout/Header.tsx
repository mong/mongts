import React from "react";
import Link from "next/link";
import Image from "next/image";

import { imgLoader } from "qmongjs";
import classNames from "./Header.module.css";

import { MenuButton } from "../Buttons";
import { Menu } from "../Menu";
import { PopUp } from "../PopUp";

type HeaderProps = {
  origin: string;
  lang: "no" | "en";
};

export const Header: React.FC<HeaderProps> = ({ lang }) => {
  return (
    <header className={`${classNames.headerContainer}`}>
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
      <nav className={classNames.headerNavContainer}>
        <div className={classNames.navButtons}>
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
          <div className={classNames.menuButton}>
            <PopUp btnComponent={() => <MenuButton lang={lang} />}>
              <Menu lang={lang} />
            </PopUp>
          </div>
        </div>
      </nav>
    </header>
  );
};
