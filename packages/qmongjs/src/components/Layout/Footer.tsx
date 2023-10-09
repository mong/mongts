import React from "react";
import Link from "next/link";
import skdeLogo from "../../img/logos/SKDE_hvit_lys.png";
import helseNordLogo from "../../img/logos/hf_nord-white.svg";
import NSMLogo from "../../img/logos/NSM_logo_hvit.png";
import helseatlasLogo from "../../img/logos/Logo_atlas_hvit.png";
import { imgLoader } from "../../helpers/functions";

import style from "./Footer.module.css";
import Image from "next/image";

export const Footer: React.FC = () => {
  return (
    <footer className={style.footer}>
      <div className={style.footerTop}>
        <div>
          <Link href="/">
            <>
              <Image
                loader={imgLoader}
                src={skdeLogo}
                alt="skde logo"
                width={99}
                height={40}
              />
            </>
          </Link>
        </div>
        <div className={style.skdeContact}>
          <strong>Telefon:</strong>
          <a href="tel:77755800"> 777 55 800</a>
          <br />
          <strong>E-post:</strong>
          <a href="mailto:postmottak@helse-nord.no">
            {" "}
            postmottak@helse-nord.no
          </a>
          <br />
          <strong>Webredaktør:</strong>
          <a href="mailto:webmaster@skde.no"> webmaster@skde.no</a>
          <br />
        </div>
        <div className={style.skdePrivacy}>
          <Link title="Link til kontakt SKDE" href={`/kontakt`}>
            Kontakt
          </Link>
          <br />
          <Link title="Link til personvern" href={`/personvern`}>
            Personvern
          </Link>
          <Link
            href="/informasjonskapsler"
            title="Link til informasjon om informasjonskapsler"
          >
            Informasjonskapsler
          </Link>
        </div>
      </div>
      <div className={style.footerBottom}>
        <div>
          <a title="Link til Helse Nord RHF" href="https://www.helse-nord.no">
            <Image
              loader={imgLoader}
              src={helseNordLogo}
              alt="Helse Nord logo"
              width={180}
              height={40}
            />
          </a>
        </div>
        <div>
          <a
            title="Link til kvalitetsregistre"
            href="https://www.kvalitetsregistre.no"
          >
            <Image
              loader={imgLoader}
              src={NSMLogo}
              alt="NSM logo"
              width={287}
              height={32}
            />
          </a>
        </div>
        <div>
          <Link title="Link til helseatlas" href="/helseatlas">
            <>
              <Image
                loader={imgLoader}
                src={helseatlasLogo}
                alt="Helseatlas logo"
                width={146}
                height={40}
              />
            </>
          </Link>
        </div>
      </div>
    </footer>
  );
};
