/*
 *
 * EditPage
 *
 */

import React, { useEffect, useState } from "react";
import { useParams, NavLink, Prompt } from "react-router-dom";
import { useIntl } from "react-intl";
import { AxiosError } from "axios";
import {
  LoadingIndicatorPage,
  useNotification,
  useAPIErrorHandler,
} from "@strapi/helper-plugin";
import {
  BaseHeaderLayout,
  Button,
  Box,
  Layout,
  ContentLayout,
  Grid,
  GridItem,
  Flex,
} from "@strapi/design-system";
import { Link, SubNav } from "@strapi/design-system/v2";
import { Pencil, ArrowLeft } from "@strapi/icons";
import EditorPageStringsContext, {
  EditPageStrings,
} from "./EditPageStringsContext";
import EditTitleModal from "./EditTitleModal";
import { getAtlas, updateAtlas } from "../../api/atlas-editor";
import pluginId from "../../pluginId";

const emptyAtlas = {
  id: -1,
  mainTitle: "",
  shortTitle: "",
  isPublished: false,
  createdAt: new Date(),
  updatedAt: new Date(),
};

const EditPage = () => {
  const handleUpdateAtlas = async (atlas) => {
    setIsLoading(true);

    const { updateSuccess, err } = await updateAtlas(atlas);

    if (updateSuccess) {
      setHasUnsavedChanges(false);
      toggleNotification({ type: "info", message: strings.updateSuccess });
    } else {
      if (err instanceof AxiosError) {
        toggleNotification({ type: "warning", message: formatAPIError(err) });
      } else {
        toggleNotification({ type: "warning", message: strings.updateError });
      }
    }

    setIsLoading(false);
  };

  const onEditTitleModalFinished = (editedResults) => {
    if (editedResults.mainTitle !== atlas.mainTitle) {
      setHasUnsavedChanges(true);
      setAtlas({ ...atlas, mainTitle: editedResults.mainTitle });
    }

    setIsEditingTitle((prev) => !prev);
  };

  const { id } = useParams();
  const { formatMessage, formatDate } = useIntl();
  const { formatAPIError } = useAPIErrorHandler();
  const toggleNotification = useNotification();
  const [atlas, setAtlas] = useState(emptyAtlas);
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const strings = new EditPageStrings(formatMessage);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const atlas = await getAtlas(id);
      setAtlas(atlas);
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <>
      <Box background="neutral100">
        <Layout sideNav={<SubNav ariaLabel="Atlas-editor sub nav"></SubNav>}>
          <>
            <BaseHeaderLayout
              navigationAction={
                <Link
                  as={NavLink}
                  startIcon={<ArrowLeft />}
                  to={`/plugins/${pluginId}`}
                >
                  {strings.goBack}
                </Link>
              }
              primaryAction={
                <Button
                  onClick={() => handleUpdateAtlas(atlas)}
                  disabled={!hasUnsavedChanges}
                >
                  {strings.save}
                </Button>
              }
              secondaryAction={
                <Button
                  variant="tertiary"
                  startIcon={<Pencil />}
                  onClick={() => setIsEditingTitle((prev) => !prev)}
                >
                  {strings.edit}
                </Button>
              }
              title={atlas?.mainTitle}
              as="h2"
            />
            <ContentLayout>
              <Grid gap={4}>
                <GridItem col={9} s={12}>
                  <Flex direction="column" alignItems="stretch" gap={6}>
                    <Box
                      hasRadius
                      background="neutral0"
                      shadow="tableShadow"
                      paddingLeft={6}
                      paddingRight={6}
                      paddingTop={6}
                      paddingBottom={6}
                      borderColor="neutral150"
                    ></Box>
                  </Flex>
                </GridItem>
                <GridItem col={3} s={12}>
                  <Flex direction="column" alignItems="stretch" gap={2}>
                    <Box
                      as="aside"
                      aria-labelledby="additional-information"
                      background="neutral0"
                      borderColor="neutral150"
                      hasRadius
                      paddingBottom={4}
                      paddingLeft={4}
                      paddingRight={4}
                      paddingTop={6}
                      shadow="tableShadow"
                    ></Box>
                  </Flex>
                </GridItem>
              </Grid>
            </ContentLayout>
          </>
        </Layout>
      </Box>
      {isEditingTitle && (
        <EditorPageStringsContext.Provider value={strings}>
          <EditTitleModal
            mainTitle={atlas.mainTitle}
            onCancel={() => setIsEditingTitle((prev) => !prev)}
            onFinish={onEditTitleModalFinished}
          ></EditTitleModal>
        </EditorPageStringsContext.Provider>
      )}
      <Prompt
        message={(location) =>
          location.hash === "#back" ? false : strings.unsavedChangesPrompt
        }
        when={hasUnsavedChanges}
      />
    </>
  );
};

export default EditPage;
