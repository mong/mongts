import Link from "next/link";
import { useRouter } from "next/router";

import style from "./headertabs.module.css";

interface HeaderTabProps {
  tabNames: { label: string; value: string }[];
  activeTab: string;
}

export const HeaderTabs = ({ tabNames, activeTab }: HeaderTabProps) => {
  const tabs = tabNames.map((tabName, i) => {
    return (
      <Tab
        tabName={tabName}
        activeTab={activeTab}
        key={`${tabName.value.replace(/\s/g, "")}${i}`}
      />
    );
  });

  return (
    <div className={style.tabs}>
      <div className={style.tabsWrapper}>
        <ul className={style.tabsUL}>{tabs}</ul>
      </div>
    </div>
  );
};

interface TabProps {
  tabName: { value: string; label: string };
  activeTab: string;
}

const Tab = ({ tabName, activeTab }: TabProps) => {
  const { tab, register } = useRouter().query as {
    tab: string;
    register: string;
  };

  const queries = useRouter().asPath.split("?")[1];
  const queryPath = queries ? `?${queries}` : "";
  const clickedStyle =
    activeTab === tabName.value
      ? {
          color: "#6da7df",
          boxShadow: "-7px 7px 10px -5px #ccc",
          backgroundColor: "white",
          borderBottom: "3px solid white",
          borderRadius: "5px",
        }
      : {};
  const path = register
    ? `/kvalitetsregistre/${register}`
    : "/kvalitetsregistre/alle";

  return (
    <li className={style.tabsLI}>
      <Link
        href={`${path}/${tabName.value}/${queryPath}`}
        passHref
        role="tab"
        aria-selected={tabName.value === tab}
        style={clickedStyle}
        className={style.tabsLink}
        data-testid={`tab_${tabName.value}`}
      >
        {tabName.label}
      </Link>
    </li>
  );
};
