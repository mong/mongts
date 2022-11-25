import React from "react";
import style from "./Header.module.css";
import skdeLogo from "../../img/logos/SKDE_sort.png";
import Link from "next/link";
import Image from "next/image";
import { imgLoader } from "../../helpers/functions";

export const Header: React.FC = () => {
  return (
    <div style={{}}>
      <header className={style.header}>
        <div className={style.logo}>
          <Link href="/">
            <>
              <Image
                loader={imgLoader}
                className={style.logo_img}
                src={skdeLogo}
                alt="SKDE logo"
                height={39}
                width={96}
              />
            </>
          </Link>
        </div>
        <div>
          <Link href={`/kontakt`}>Kontakt</Link>
        </div>
      </header>
    </div>
  );
};
