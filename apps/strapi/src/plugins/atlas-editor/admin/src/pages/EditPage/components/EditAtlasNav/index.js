"use strict";

// Based on packages/core/admin/admin/src/pages/Settings/components/SettingsNav.tsx

import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTracking } from "@strapi/helper-plugin";
import {
  SubNav,
  SubNavHeader,
  SubNavSections,
  SubNavSection,
  SubNavLink,
} from "@strapi/design-system/v2";

const EditAtlasNav = () => {
  const { trackUsage } = useTracking();
  const { pathname } = useLocation();

  const handleClickOnLink = (destination) => () => {
    trackUsage("willNavigate", { from: pathname, to: destination });
  };

  const link = {
    id: "mainTitle",
    intlLabel: "Hovedtittel",
    to: `#mainTitle`,
    hasNotification: false,
  };

  const section = {
    id: "toc",
    intlLabel: "Innholdsfortegnelse",
  };

  return (
    <SubNav ariaLabel="health-atlas edit subnav">
      <SubNavHeader label="Oversikt" />
      <SubNavSections>
        <SubNavSection key={section.id} label={section.intlLabel}>
          <SubNavLink
            as={NavLink}
            withBullet={link.hasNotification}
            to={link.to}
            onClick={handleClickOnLink(link.to)}
            key={link.id}
          >
            {link.intlLabel}
          </SubNavLink>
        </SubNavSection>
      </SubNavSections>
    </SubNav>
  );
};

export { EditAtlasNav };
