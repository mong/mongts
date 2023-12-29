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
  ToggleInput,
} from "@strapi/design-system";
import { Link } from "@strapi/design-system/v2";
import { Pencil, ArrowLeft } from "@strapi/icons";
import EditorPageStringsContext, {
  EditPageStrings,
} from "./EditPageStringsContext";
import { getAtlas, updateAtlas } from "../../api/atlas-editor";
import InformationBox from "../../components/InformationBox";
import EditTitleModal from "./components/EditTitleModal";
import AtlasFrontPageFields from "./components/AtlasFrontPageFields";
import pluginId from "../../pluginId";
import { EditAtlasNav } from "./components/EditAtlasNav";
import { areDifferent, findDiff } from "./utils/differences";
import { update } from "lodash";

const emptyAtlas = {
  id: -1,
  mainTitle: "",
  shortTitle: "",
  isPublished: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  publishedAt: null,
};

const EditPage = () => {
  const handleUpdateAtlas = async (atlas) => {
    setIsLoading(true);

    updatePublishedInfo(atlas);

    const { updateSuccess, err, updatedContent } = await updateAtlas(
      atlas.current,
    );

    if (updateSuccess) {
      setHasUnsavedChanges(false);
      setAtlas({ current: updatedContent, original: updatedContent });
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

  const updatePublishedInfo = (atlas) => {
    if (atlas.current.isPublished && !atlas.original.isPublished) {
      atlas.current.updatePublishedInfo = true;
    }
  };

  const handleFieldChange = (fieldName, value) => {
    const updatedCurrentAtlas = { ...atlas.current, [fieldName]: value };

    setAtlas({ current: updatedCurrentAtlas, original: atlas.original });

    const hasChanges = areDifferent(updatedCurrentAtlas, atlas.original);
    if (hasUnsavedChanges != hasChanges) {
      setHasUnsavedChanges(hasChanges);
    }
  };

  const onEditTitleModalFinished = (editedResults) => {
    if (editedResults.mainTitle !== atlas.current.mainTitle) {
      const updatedCurrentAtlas = {
        ...atlas.current,
        mainTitle: editedResults.mainTitle,
      };

      setAtlas({ current: updatedCurrentAtlas, original: atlas.original });

      const hasChanges = areDifferent(updatedCurrentAtlas, atlas.original);
      if (hasUnsavedChanges != hasChanges) {
        setHasUnsavedChanges(hasChanges);
      }
    }

    setIsEditingTitle((prev) => !prev);
  };

  const { id } = useParams();
  const { formatMessage } = useIntl();
  const { formatAPIError } = useAPIErrorHandler();
  const toggleNotification = useNotification();
  const [atlas, setAtlas] = useState({
    current: emptyAtlas,
    original: emptyAtlas,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);

  const strings = new EditPageStrings(formatMessage);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const fetchedAtlas = await getAtlas(id);
      setAtlas({ current: fetchedAtlas, original: fetchedAtlas });
      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  if (isLoading) return <LoadingIndicatorPage />;

  return (
    <>
      <EditorPageStringsContext.Provider value={strings}>
        <Box background="neutral100">
          <Layout sideNav={<EditAtlasNav />}>
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
                title={atlas.current?.mainTitle}
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
                      >
                        <ToggleInput
                          size="S"
                          label={strings.isPublished}
                          onLabel={strings.yes}
                          offLabel={strings.no}
                          checked={atlas.current.isPublished}
                          onChange={(e) =>
                            handleFieldChange("isPublished", e.target.checked)
                          }
                        />
                      </Box>
                      <Box
                        hasRadius
                        background="neutral0"
                        shadow="tableShadow"
                        paddingLeft={6}
                        paddingRight={6}
                        paddingTop={6}
                        paddingBottom={6}
                        borderColor="neutral150"
                      >
                        <AtlasFrontPageFields />
                      </Box>
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
                      >
                        <InformationBox atlas={atlas.current} />
                      </Box>
                    </Flex>
                  </GridItem>
                </Grid>
              </ContentLayout>
            </>
          </Layout>
        </Box>
        {isEditingTitle && (
          <EditTitleModal
            mainTitle={atlas.current?.mainTitle}
            onCancel={() => setIsEditingTitle((prev) => !prev)}
            onFinish={onEditTitleModalFinished}
          ></EditTitleModal>
        )}
        <Prompt
          message={(location) =>
            location.hash === "#back" ? false : strings.unsavedChangesPrompt
          }
          when={hasUnsavedChanges}
        />
      </EditorPageStringsContext.Provider>
    </>
  );
};

export default EditPage;
