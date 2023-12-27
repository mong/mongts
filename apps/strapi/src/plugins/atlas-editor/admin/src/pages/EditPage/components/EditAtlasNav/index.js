"use strict";

// Based on packages/core/admin/admin/src/pages/Settings/components/SettingsNav.tsx

import React, { useContext } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTracking } from "@strapi/helper-plugin";
import {
  SubNav,
  SubNavHeader,
  SubNavSections,
  SubNavSection,
  SubNavLink,
} from "@strapi/design-system/v2";
import EditPageStringsContext from "../../EditPageStringsContext";

const EditAtlasNav = () => {
  const strings = useContext(EditPageStringsContext);

  const { trackUsage } = useTracking();
  const { pathname } = useLocation();

  const section = {
    id: "toc",
    intlLabel: strings.toc,
  };

  return (
    <SubNav ariaLabel="health-atlas edit subnav">
      <SubNavHeader id="overview" label={strings.overview} />
      <SubNavSections>
        <SubNavSection
          key={section.id}
          label={section.intlLabel}
        ></SubNavSection>
      </SubNavSections>
    </SubNav>
  );
};

export { EditAtlasNav };
