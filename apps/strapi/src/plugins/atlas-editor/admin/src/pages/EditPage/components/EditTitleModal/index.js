import React, { useState, useContext } from "react";
import {
  ModalLayout,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Typography,
  Button,
  Field,
  FieldError,
  FieldHint,
  FieldInput,
  FieldLabel,
} from "@strapi/design-system";
import EditPageStringsContext from "../../EditPageStringsContext";

const EditTitleModal = ({ mainTitle, onFinish, onCancel }) => {
  const handleCancel = () => {
    setEditedMainTitle(mainTitle);
    onCancel(editedMainTitle);
  };

  const handleClose = () => {
    handleCancel();
  };

  const handleFinish = () => {
    onFinish({ mainTitle: editedMainTitle.trim() });
  };

  const validateMainTitle = (mainTitle) => {
    if (!mainTitle.trim()) {
      return { isValid: false, error: strings.mainTitleCannotBeEmpty };
    }

    return { isValid: true, error: null };
  };

  const handleMainTitleChange = (e) => {
    const newMainTitle = e.target.value;
    setEditedMainTitle(newMainTitle);
    setInvalid(!validateMainTitle(newMainTitle).isValid);
  };

  const strings = useContext(EditPageStringsContext);
  const [editedMainTitle, setEditedMainTitle] = useState(mainTitle ?? "");
  const [isInvalid, setInvalid] = useState(
    !validateMainTitle(editedMainTitle).isValid,
  );

  return (
    <ModalLayout onClose={handleClose} labelledBy="editModalTitle">
      <ModalHeader>
        <Typography
          fontWeight="bold"
          textColor="neutral800"
          as="h2"
          id="editModalTitle"
        >
          {strings.editModalTitle}
        </Typography>
      </ModalHeader>
      <ModalBody>
        <Field
          name="mainTitleField"
          hint={strings.editMainTitleHint}
          error={validateMainTitle(editedMainTitle).error}
        >
          <FieldLabel>{strings.mainTitleLabel}</FieldLabel>
          <FieldInput
            type="text"
            placeholder={strings.enterTitle}
            value={editedMainTitle}
            onChange={handleMainTitleChange}
          />
          <FieldHint />
          <FieldError />
        </Field>
      </ModalBody>
      <ModalFooter
        startActions={
          <Button onClick={handleCancel} variant="tertiary">
            {strings.cancel}
          </Button>
        }
        endActions={
          <Button disabled={isInvalid} onClick={handleFinish}>
            {strings.finish}
          </Button>
        }
      />
    </ModalLayout>
  );
};

export default EditTitleModal;
