/*
 *
 * HomePage
 *
 */

import React, { useState } from "react";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import {
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,
  Box,
} from "@strapi/design-system";
import { LinkButton } from "@strapi/design-system/v2";
import { Plus } from "@strapi/icons";
import { Illo } from "../../components/Illo";
import getTrad from "../../utils/getTrad";
import pluginId from "../../pluginId";

const getStrings = (formatMessage) => {
  const title = formatMessage({
    id: getTrad("Homepage.BaseHeaderLayout.title"),
    defaultMessage: "Helseatlas",
  });

  const subTitle = formatMessage({
    id: getTrad("Homepage.BaseHeaderLayout.subtitle"),
    defaultMessage: "Manage health atlases",
  });

  const emptyStateContent = formatMessage({
    id: getTrad("Homepage.EmptyStateLayout.content"),
    defaultMessage: "Create the first atlas",
  });

  const firstAddButtonText = formatMessage({
    id: getTrad("Homepage.EmptyStateLayout.buttonText"),
    defaultMessage: "Create atlas",
  });

  return { title, subTitle, emptyStateContent, firstAddButtonText };
};

const HomePage = () => {
  const { formatMessage } = useIntl();
  const { title, subTitle, emptyStateContent, firstAddButtonText } =
    getStrings(formatMessage);

  const [atlasList, setAtlasList] = useState([]);

  return (
    <Box background="neutral100">
      <BaseHeaderLayout title={title} subtitle={subTitle} as="h2" />

      <ContentLayout>
        {" "}
        {atlasList.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content={emptyStateContent}
            action={
              <LinkButton
                as={NavLink}
                to={`/plugins/${pluginId}/editor`}
                startIcon={<Plus />}
              >
                {firstAddButtonText}
              </LinkButton>
            }
          />
        ) : (
          <p>Found {atlasList.length} atlases</p>
        )}
      </ContentLayout>
    </Box>
  );
};

export default HomePage;
