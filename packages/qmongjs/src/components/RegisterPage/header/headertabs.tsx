import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

import style from "./headertabs.module.css";

export interface HeaderTabProps {
  tabNames: { label: string; value: string }[];
  activeTab: string;
}

export const HeaderTabs: React.FC<HeaderTabProps> = ({
  tabNames,
  activeTab,
}) => {
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

const Tab: React.FC<TabProps> = ({ tabName, activeTab }) => {
  const { tab, register, selected_treatment_units } = useRouter().query as {
    tab: string;
    register: string;
    selected_treatment_units: string;
  };
  const queries = selected_treatment_units
    ? `?selected_treatment_units=${selected_treatment_units}`
    : "";
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
        href={`${path}/${tabName.value}/${queries}`}
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
