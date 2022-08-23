import React from "react";
import style from "./index.module.css";
const skdeLogo = "/img/logos/SKDE_sort.png";

type HeaderProps = {};

const Header: React.FC<HeaderProps> = () => {
  const [origin, setOrigin] = React.useState("");
  React.useEffect(() => {
    setOrigin(window.location.origin);
  }, [setOrigin]);
  return (
    <div style={{}}>
      <header className={style.header}>
        <div className={style.logo}>
          <a href={`${origin}`}>
            <img className={style.logo_img} src={skdeLogo} alt="SKDE logo" />
          </a>
        </div>
        <div>
          <a href={`${origin}/kontakt`}>Kontakt</a>
        </div>
      </header>
    </div>
  );
};

export default Header;
