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
import { BaseHeaderLayout, Button, Box } from "@strapi/design-system";
import { Link } from "@strapi/design-system/v2";
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
      <Prompt
        message={(location) =>
          location.hash === "#back" ? false : strings.unsavedChangesPrompt
        }
        when={hasUnsavedChanges}
      />
      <Box background="neutral100">
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
      </Box>
      {isEditingTitle && (
        <EditorPageStringsContext.Provider value={strings}>
          <EditTitleModal
            mainTitle={atlas?.mainTitle}
            onCancel={(editedTitle) => setIsEditingTitle((prev) => !prev)}
            onFinish={onEditTitleModalFinished}
          ></EditTitleModal>
        </EditorPageStringsContext.Provider>
      )}
    </>
  );
};

export default EditPage;
