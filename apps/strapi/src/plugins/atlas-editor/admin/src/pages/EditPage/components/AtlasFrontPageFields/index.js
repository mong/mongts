import React, { useState, useContext } from "react";
import {
  Typography,
  Flex,
  Field,
  FieldError,
  FieldHint,
  FieldInput,
  FieldLabel,
} from "@strapi/design-system";
import EditPageStringsContext from "../../EditPageStringsContext";

const AtlasFrontPageFields = ({ shortTitle, onFieldChanged }) => {
  const validateShortTitle = (shortTitle) => {
    if (!shortTitle.trim()) {
      return { isValid: false, error: strings.shortTitleCannotBeEmpty };
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

  const strings = useContext(EditPageStringsContext);
  const [editedShortTitle, setEditedShortTitle] = useState(shortTitle ?? "");
  const [isInvalid, setInvalid] = useState(
    !validateShortTitle(editedShortTitle).isValid,
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
    </Flex>
  );
};

export default AtlasFrontPageFields;
