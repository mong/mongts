import React, { useState, useContext } from "react";
import {
  Box,
  Typography,
  Flex,
  Field,
  FieldError,
  FieldHint,
  FieldInput,
  FieldLabel,
} from "@strapi/design-system";
import EditPageStringsContext from "../../EditPageStringsContext";
import MediaLib from "../MediaLib";

const AtlasFrontPageFields = ({
  shortTitle,
  frontPageText,
  onFieldChanged,
}) => {
  const validateShortTitle = (shortTitle) => {
    if (!shortTitle.trim()) {
      return { isValid: false, error: strings.shortTitleCannotBeEmpty };
    }

    return { isValid: true, error: null };
  };

  const validateFrontPageText = (frontPageText) => {
    if (!frontPageText.trim()) {
      return { isValid: false, error: strings.frontPageTextCannotBeEmpty };
    }

    return { isValid: true, error: null };
  };

  const handleShortTitleChange = (e) => {
    const newShortTitle = e.target.value;
    const { isValid } = validateShortTitle(newShortTitle);
    setEditedShortTitle(newShortTitle);
    setInvalid(!isValid);

    if (onFieldChanged) {
      onFieldChanged("shortTitle", newShortTitle.trim(), !isValid);
    }
  };

  const handleFrontPageTextChange = (e) => {
    const newFrontPageText = e.target.value;
    const { isValid } = validateFrontPageText(newFrontPageText);
    setEditedFrontPageText(newFrontPageText);
    setInvalid(!isValid);

    if (onFieldChanged) {
      onFieldChanged("frontPageText", newFrontPageText.trim(), !isValid);
    }
  };

  // Media library
  const [frontPageImageModalIsOpen, setFrontPageImageModalIsOpen] =
    useState(false);
  const [selectedFrontPageImageAssets, setSelectedFrontPageImageAssets] =
    useState([]);

  const handleToggleFrontPageImageModal = () => {
    setFrontPageImageModalIsOpen(!frontPageImageModalIsOpen);
  };

  const handleFrontPageImageChange = (assets) => {
    setSelectedFrontPageImageAssets(assets);

    if (onFieldChanged) {
      const imageId = assets.length > 0 ? assets[0].id : null;
      onFieldChanged("frontPageImage", imageId, false);
    }
  };

  // Media library end

  const strings = useContext(EditPageStringsContext);
  const [editedShortTitle, setEditedShortTitle] = useState(shortTitle ?? "");
  const [editedFrontPageText, setEditedFrontPageText] = useState(
    frontPageText ?? "",
  );
  const [isInvalid, setInvalid] = useState(
    !(
      validateShortTitle(editedShortTitle).isValid &&
      validateFrontPageText(editedFrontPageText).isValid
    ),
  );

  return (
    <Flex direction="column" alignItems="stretch" gap={4}>
      <Typography variant="delta" as="h2">
        {strings.frontPageFields}
      </Typography>

      <Field
        name="shortTitleField"
        hint={strings.shortTitleHint}
        error={validateShortTitle(editedShortTitle).error}
      >
        <FieldLabel>{strings.shortTitleLabel}</FieldLabel>
        <FieldInput
          type="text"
          placeholder={strings.enterShortTitle}
          value={editedShortTitle}
          onChange={handleShortTitleChange}
        />
        <FieldHint />
        <FieldError />
      </Field>

      <Field
        name="frontPageTextField"
        hint={strings.frontPageTextHint}
        error={validateFrontPageText(editedFrontPageText).error}
      >
        <FieldLabel>{strings.frontPageTextLabel}</FieldLabel>
        <FieldInput
          type="text"
          placeholder={strings.enterFrontPageText}
          value={editedFrontPageText}
          onChange={handleFrontPageTextChange}
        />
        <FieldHint />
        <FieldError />
      </Field>

      <Field
        name="frontPageImageField"
        hint="Image shown on the Helseatlas front page"
      >
        <button onClick={handleToggleFrontPageImageModal}>
          Open Media Library
        </button>
        <MediaLib
          isOpen={frontPageImageModalIsOpen}
          onChange={handleFrontPageImageChange}
          onToggle={handleToggleFrontPageImageModal}
        />
        {
          // ? displayFrontPageImageThumb()
        }
      </Field>
    </Flex>
  );
};

export default AtlasFrontPageFields;
