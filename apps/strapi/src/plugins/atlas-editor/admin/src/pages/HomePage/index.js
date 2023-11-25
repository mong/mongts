/*
 *
 * HomePage
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
import pluginId from "../../pluginId";
import { BaseHeaderLayout, Box, Layout, SubNav } from "@strapi/design-system";
import { useIntl } from "react-intl";
import getTrad from "../../utils/getTrad";

const HomePage = () => {
  const { formatMessage } = useIntl();

  return (
    <Box background="neutral100">
      <Layout sideNav={<SubNav ariaLabel="Helseatlas sub nav"></SubNav>}>
        <>
          <BaseHeaderLayout
            title={formatMessage({
              id: getTrad("Homepage.BaseHeaderLayout.title"),
              defaultMessage: "Helseatlas",
            })}
            subtitle={formatMessage({
              id: getTrad("Homepage.BaseHeaderLayout.subtitle"),
              defaultMessage: "Welcome to the publication platform!",
            })}
            as="h2"
          />
        </>
      </Layout>
    </Box>
  );
};

export default HomePage;
