import Link from "next/link";
import Image from "next/image";

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
            <Link href="https://helse-nord.no/" title="Link til Helse Nord">
              <Image
                loader={imgLoader}
                src={`/helseatlas/img/logos/helse-nord-hvit.svg`}
                height={40}
                width={180}
                alt="Helse Nord logo"
              />
            </Link>
          </div>
          <div className={classNames.logo}>
            <Link href="https://www.skde.no/" title="Link til SKDE">
              <Image
                loader={imgLoader}
                src={`/helseatlas/img/logos/skde-hvit.svg`}
                height={40}
                width={180}
                alt="SKDE logo"
              />
            </Link>
          </div>
          <div className={classNames.logo}>
            <Link href="https://helse-forde.no/" title="Link til Helse Førde">
              <Image
                loader={imgLoader}
                src={`/helseatlas/img/logos/helse-forde-hvit.svg`}
                height={40}
                width={180}
                alt="Helse Førde logo"
              />
            </Link>
          </div>
          <div className={classNames.logo}>
            <Link href="https://helse-vest.no/" title="Link til Helse Vest">
              <Image
                loader={imgLoader}
                src={`/helseatlas/img/logos/helse-vest-hvit.svg`}
                height={40}
                width={180}
                alt="Helse Vest logo"
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
