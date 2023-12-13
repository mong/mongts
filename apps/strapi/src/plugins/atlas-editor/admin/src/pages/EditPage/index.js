/*
 *
 * EditPage
 *
 */

import React, { useEffect, useState } from "react";
import { useParams, NavLink, Prompt } from "react-router-dom";
import { useIntl } from "react-intl";
import { LoadingIndicatorPage } from "@strapi/helper-plugin";
import { BaseHeaderLayout, Button, Box } from "@strapi/design-system";
import { Link } from "@strapi/design-system/v2";
import { Pencil, ArrowLeft } from "@strapi/icons";
import EditorPageStringsContext, {
  EditPageStrings,
} from "./EditPageStringsContext";
import { getAtlas } from "../../api/atlas-editor";
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
  const { id } = useParams();
  const [atlas, setAtlas] = useState(emptyAtlas);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { formatMessage, formatDate } = useIntl();
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
            <Button disabled={!hasUnsavedChanges}>{strings.save}</Button>
          }
          secondaryAction={
            <Button variant="tertiary" startIcon={<Pencil />}>
              {strings.edit}
            </Button>
          }
          title={atlas?.mainTitle}
          as="h2"
        />
      </Box>
    </>
  );
};

export default EditPage;
