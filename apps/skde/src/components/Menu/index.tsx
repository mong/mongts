import React from "react";
import Link from "next/link";
import classNames from "./Menu.module.css";

type MenuProps = {
  lang: "no" | "en";
};

export const Menu: React.FC<MenuProps> = ({ lang }) => {
  return (
    <div className={classNames.main_menu} data-testid="mainMenu">
      <div className={classNames.container}>
        <div className={classNames.nav_group}>
          <div className={classNames.body}>
            <>{lang === "en" ? <EnglishMenu /> : <NorskMeny />}</>
          </div>
        </div>
      </div>
    </div>
  );
};

const EnglishMenu = () => {
  return (
    <>
      <div className={classNames.inner_nav_group}>
        <ul>
          <span className={classNames.title}>About</span>
          <ul>
            <li>
              <Link href="/helseatlas/en/static/about">Helseatlas</Link>
            </li>
            <li>
              <Link href="/helseatlas/en/static/contact">Contact</Link>
            </li>
          </ul>
        </ul>
      </div>
      <div className={classNames.inner_nav_group}>
        <ul>
          <span className={classNames.title}>Our Helseatlas</span>
          <ul>
            <li>
              <Link href="/helseatlas/en/v2/kronikere">
                Health atlas for chronic diseases
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/en/v2/kvalitet">
                Healthcare Quality Atlas
              </Link>
            </li>
            <li data-testid="menuAtlasLink1">
              <Link href="/helseatlas/en/v2/psyk">
                Healthcare Atlas for Mental Healthcare and Substance Abuse
                Treatment
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/en/v2/fodsel">
                Obstetrics Healthcare Atlas
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/en/v2/gyn">
                Gynaecology Healthcare Atlas
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/en/v2/ortopedi">
                Orthopaedic Healthcare Atlas for Norway
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/en/v2/dagkir2">
                Day surgery in Norway 2013–2017
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/en/v2/kols">COPD Healthcare Atlas</Link>
            </li>
            <li>
              <Link href="/helseatlas/en/v2/eldre">
                Healthcare Atlas for the Elderly in Norway
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/en/v2/nyfodt">
                The Norwegian Neonatal Healthcare Atlas
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/en/v2/barn">
                Child healthcare atlas for Norway
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/en/v2/dagkir">
                Day surgery in Norway 2011–2013
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    </>
  );
};

const NorskMeny = () => {
  return (
    <>
      <div className={classNames.inner_nav_group}>
        <ul>
          <span className={classNames.title}>Om oss</span>
          <ul>
            <li>
              <Link href="/helseatlas/statisk/om">Om helseatlas</Link>
            </li>
            <li>
              <Link href="/helseatlas/statisk/planer-for-helseatlastjenesten">
                Planer for helseatlastjenesten
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/statisk/kontakt">Kontakt</Link>
            </li>
          </ul>
        </ul>
      </div>
      <div className={classNames.inner_nav_group}>
        <ul>
          <span className={classNames.title}>Våre helseatlas</span>
          <ul>
            <li data-testid="menuAtlasLink2">
              <Link href="/helseatlas/v2/radiologi2">
                Helseatlas radiologi andre del, MR
              </Link>
            </li>
            <li data-testid="menuAtlasLink2">
              <Link href="/helseatlas/v2/fedme">Helseatlas fedme</Link>
            </li>
            <li data-testid="menuAtlasLink2">
              <Link href="/helseatlas/v2/hjarteinfarkt">
                Helseatlas hjarteinfarkt
              </Link>
            </li>
            <li data-testid="menuAtlasLink2">
              <Link href="/helseatlas/v2/radiologi">
                Helseatlas radiologi første del, MR
              </Link>
            </li>
            <li data-testid="menuAtlasLink2">
              <Link href="/helseatlas/v2/kronikere">
                Helseatlas for utvalgte kroniske sykdommer
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/v2/kvalitet">
                Helseatlas for kvalitet
              </Link>
            </li>
            <li data-testid="menuAtlasLink1">
              <Link href="/helseatlas/v2/psyk">
                Helseatlas for psykisk helsevern og rusbehandling
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/v2/fodsel">
                Helseatlas for fødselshjelp
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/v2/gyn">Helseatlas for gynekologi</Link>
            </li>
            <li>
              <Link href="/helseatlas/v2/ortopedi">
                Helseatlas i ortopedi for Noreg
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/v2/dagkir2">
                Dagkirurgi i Norge 2013–2017
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/v2/kols">Helseatlas kols</Link>
            </li>
            <li>
              <Link href="/helseatlas/v2/eldre">Eldrehelseatlas for Norge</Link>
            </li>
            <li>
              <Link href="/helseatlas/v2/nyfodt">
                Norsk nyfødtmedisinsk helseatlas
              </Link>
            </li>
            <li>
              <Link href="/helseatlas/v2/barn">Barnehelseatlas for Norge</Link>
            </li>
            <li>
              <Link href="/helseatlas/v2/dagkir">
                Dagkirurgi i Norge 2011–2013
              </Link>
            </li>
          </ul>
        </ul>
      </div>
      <div className={classNames.inner_nav_group}>
        <ul>
          <span className={classNames.title}>Andre analyser</span>
          <ul>
            <li data-testid="menuAtlasLink2">
              <Link href="/helseatlas/v2/endometriose">
                Kirurgiske inngrep for endometriose
              </Link>
            </li>
          </ul>
        </ul>
      </div>
    </>
  );
};
