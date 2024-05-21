import { NSMLogo } from "./nsmlogo";
import { HeaderTabs } from "./headertabs";
import SelectRegister from "../../SelectRegister";
import { RegisterName } from "types";

import style from "./header.module.css";
export interface HeaderProps {
  registerNames: RegisterName[];
  tabNames?: { label: string; value: string }[];
  dataFrom?: string;
  activeTab: string;
}

export const Header = (props: HeaderProps) => {
  const {
    registerNames,
    tabNames = [],
    dataFrom = "medisinske kvalitetsregistre",
    activeTab,
  } = props;

  return (
    <div className={style.headerOuterWrapper}>
      <div className={style.headerInnerWrapper}>
        <div className={style.topHeader}>
          <div className={style.topHeaderLeft}>
            <NSMLogo />
            <div className={style.headerText}>
              <h3>Resultater fra {dataFrom}</h3>
            </div>
          </div>
          <div className={style.topHeaderRight}>
            <SelectRegister
              activeTab={activeTab}
              regNames={registerNames}
              selection_bar_height={null}
            />
          </div>
        </div>
        {tabNames.length > 1 ? (
          <HeaderTabs activeTab={activeTab} tabNames={tabNames} />
        ) : null}
      </div>
    </div>
  );
};
