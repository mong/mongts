import Link from "next/link";
import Image from "next/legacy/image";

import classNames from "./Footer.module.css";
import { imgLoader } from "../../helpers/functions";

export const Footer: React.FC<{}> = ({}) => {
  return (
    <footer className={classNames.footerContainer}>
      <div className={classNames.footerContent}>
        <div className={classNames.footerTop}>
          <strong>Senter for klinisk dokumentasjon og evaluering (SKDE)</strong>
          <br />
          Postboks 6
          <br />
          9038 Tromsø
          <br />
          <br />
          <strong>Helse Førde</strong>
          <br />
          Postboks 1000
          <br />
          6807 Førde
        </div>

        <div className={classNames.footerBottom}>
          <div className={classNames.logo}>
            <Link href="https://helse-nord.no/">
              <a title="Link til Helse Nord">
                <Image
                  loader={imgLoader}
                  src={`/helseatlas/img/logos/helse-nord-hvit.svg`}
                  height="40px"
                  width="180px"
                  alt="Helse Nord logo"
                />
              </a>
            </Link>
          </div>
          <div className={classNames.logo}>
            <Link href="https://www.skde.no/">
              <a title="Link til SKDE">
                <Image
                  loader={imgLoader}
                  src={`/helseatlas/img/logos/skde-hvit.svg`}
                  height="40px"
                  width="180px"
                  alt="SKDE logo"
                />
              </a>
            </Link>
          </div>
          <div className={classNames.logo}>
            <Link href="https://helse-forde.no/">
              <a title="Link til Helse Førde">
                <Image
                  loader={imgLoader}
                  src={`/helseatlas/img/logos/helse-forde-hvit.svg`}
                  height="40px"
                  width="180px"
                  alt="Helse Førde logo"
                />
              </a>
            </Link>
          </div>
          <div className={classNames.logo}>
            <Link href="https://helse-vest.no/">
              <a title="Link til Helse Vest">
                <Image
                  loader={imgLoader}
                  src={`/helseatlas/img/logos/helse-vest-hvit.svg`}
                  height="40px"
                  width="180px"
                  alt="Helse Vest logo"
                />
              </a>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
