/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { NavLink, Link } from "react-router-dom";
import {
  BaseHeaderLayout,
  EmptyStateLayout,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  Typography,
  VisuallyHidden,
  Flex,
  IconButton,
} from "@strapi/design-system";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { LinkButton } from "@strapi/design-system/v2";
import { Plus, Pencil } from "@strapi/icons";
import { Illo } from "../../components/Illo";
import pluginId from "../../pluginId";
import { getAtlases } from "../../api/atlas-editor";
import HomePageStringsContext, {
  HomePageStrings,
} from "./HomePageStringsContext";
import AtlasSearch from "./AtlasSearch";
import isFilterMatch from "./utils/isFilterMatch";
import toQueryString from "../../utils/toQueryString";

const HomePage = () => {
  const { formatMessage, formatDate } = useIntl();
  const strings = new HomePageStrings(formatMessage);

  const [atlasList, setAtlasList] = useState([]);
  const [atlasFilter, setAtlasFilter] = useState({ search: "" });
  const [isLoading, setIsLoading] = useState(true);

  const queryString = toQueryString({
    fields: [
      "id",
      "mainTitle",
      "shortTitle",
      "isPublished",
      "createdAt",
      "updatedAt",
    ],
    sort: "shortTitle:ASC",
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const atlases = await getAtlases(queryString);
      setAtlasList(atlases);
      setIsLoading(false);
    };

    fetchData();
  }, [queryString]);

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <>
      <BaseHeaderLayout
        primaryAction={
          <LinkButton
            as={NavLink}
            to={`/plugins/${pluginId}/create`}
            startIcon={<Plus />}
          >
            {strings.createButtonText}
          </LinkButton>
        }
        title={strings.title}
        subtitle={strings.numEntriesFound(atlasList.length)}
        as="h2"
      />
      {atlasList.length === 0 ? (
        <EmptyStateLayout
          icon={<Illo />}
          content={strings.emptyStateContent}
          action={
            <LinkButton
              as={NavLink}
              to={`/plugins/${pluginId}/create`}
              startIcon={<Plus />}
            >
              {strings.createButtonText}
            </LinkButton>
          }
        />
      ) : (
        <>
          <Box paddingLeft={10} paddingRight={10} paddingBottom={4}>
            <HomePageStringsContext.Provider value={strings}>
              <AtlasSearch
                setSearchString={(searchString) =>
                  setAtlasFilter({ ...atlasFilter, search: searchString })
                }
              />
            </HomePageStringsContext.Provider>
          </Box>
          <Box paddingLeft={10} paddingRight={10}>
            <Table>
              <Thead>
                <Tr>
                  <Th>
                    <Typography variant="sigma">
                      {strings.id.toUpperCase()}
                    </Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">
                      {strings.shortTitle.toUpperCase()}
                    </Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">
                      {strings.mainTitle.toUpperCase()}
                    </Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">
                      {strings.created.toUpperCase()}
                    </Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">
                      {strings.updated.toUpperCase()}
                    </Typography>
                  </Th>
                  <Th>
                    <Typography variant="sigma">
                      {strings.published.toUpperCase()}
                    </Typography>
                  </Th>
                  <Th>
                    <VisuallyHidden>ACTIONS</VisuallyHidden>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {atlasList
                  .filter((atlas) => isFilterMatch(atlasFilter, atlas))
                  .map((atlas) => (
                    <Tr key={atlas.id}>
                      <Td>
                        <Typography textColor="neutral800">
                          {atlas.id}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography textColor="neutral800">
                          {atlas.shortTitle}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography textColor="neutral800">
                          {atlas.mainTitle}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography textColor="neutral800">
                          {formatDate(atlas.createdAt)}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography textColor="neutral800">
                          {formatDate(atlas.updatedAt)}
                        </Typography>
                      </Td>
                      <Td>
                        <Typography textColor="neutral800">
                          {atlas.isPublished ? strings.yes : strings.no}
                        </Typography>
                      </Td>
                      <Td>
                        <Flex>
                          <IconButton
                            forwardedAs={Link}
                            to={{
                              pathname: `/plugins/${pluginId}/edit/${atlas.id}`,
                            }}
                            label={strings.edit}
                            noBorder
                            icon={<Pencil />}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Box>
        </>
      )}
    </>
  );
};

export default HomePage;
