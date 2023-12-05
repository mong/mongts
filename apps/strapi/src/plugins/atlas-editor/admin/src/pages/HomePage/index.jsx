/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";
import {
  BaseHeaderLayout,
  ContentLayout,
  EmptyStateLayout,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  Th,
  TFooter,
  Typography,
  VisuallyHidden,
  Flex,
  IconButton,
  Button,
} from "@strapi/design-system";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { LinkButton, Link } from "@strapi/design-system/v2";
import { Plus, Pencil, Trash, ArrowLeft } from "@strapi/icons";
import { Illo } from "../../components/Illo";
import pluginId from "../../pluginId";
import atlasEditorRequests from "../../api/atlas-editor";
import HomePageStrings from "./homePageStrings";

const HomePage = () => {
  const { formatMessage } = useIntl();
  const strings = new HomePageStrings(formatMessage);

  const [atlasList, setAtlasList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const atlases = await atlasEditorRequests.getAllAtlases();
      setAtlasList(atlases);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <Box padding={8} background="neutral100">
      <BaseHeaderLayout
        primaryAction={
          <Button startIcon={<Plus />}>{strings.createButtonText}</Button>
        }
        title={strings.title}
        subtitle={strings.numEntriesFound(atlasList.length)}
        as="h2"
      />

      <ContentLayout>
        {atlasList.length === 0 ? (
          <EmptyStateLayout
            icon={<Illo />}
            content={strings.emptyStateContent}
            action={
              <LinkButton
                as={NavLink}
                to={`/plugins/${pluginId}/editor`}
                startIcon={<Plus />}
              >
                {strings.createButtonText}
              </LinkButton>
            }
          />
        ) : (
          <Table>
            <Thead>
              <Tr>
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
                    {strings.published.toUpperCase()}
                  </Typography>
                </Th>
                <Th>
                  <VisuallyHidden>ACTIONS</VisuallyHidden>
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {atlasList.map((atlas) => (
                <Tr key={atlas.id}>
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
                      {atlas.isPublished ? strings.yes : strings.no}
                    </Typography>
                  </Td>
                  <Td>
                    <Flex>
                      <IconButton
                        onClick={() => console.log(strings.edit)}
                        label={strings.edit}
                        noBorder
                        icon={<Pencil />}
                      />
                      <Box paddingLeft={1}>
                        <IconButton
                          onClick={() => console.log(strings.delete)}
                          label={strings.delete}
                          noBorder
                          icon={<Trash />}
                        />
                      </Box>
                    </Flex>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </ContentLayout>
    </Box>
  );
};

export default HomePage;
