import { createContext } from "react";
import getTrad from "../../utils/getTrad";

export class EditPageStrings {
  constructor(formatMessage) {
    this.formatMessage = formatMessage;

    this.edit = formatMessage({
      id: getTrad("Editpage.BaseHeaderLayout.edit"),
      defaultMessage: "Edit",
    });

    this.save = formatMessage({
      id: getTrad("Editpage.BaseHeaderLayout.save"),
      defaultMessage: "Save",
    });

    this.goBack = formatMessage({
      id: getTrad("Editpage.BaseHeaderLayout.goback"),
      defaultMessage: "Go back",
    });

    this.created = formatMessage({
      id: getTrad("Editpage.BaseHeaderLayout.created"),
      defaultMessage: "Created",
    });

    this.updated = formatMessage({
      id: getTrad("Editpage.BaseHeaderLayout.updated"),
      defaultMessage: "Updated",
    });

    this.unsavedChangesPrompt = formatMessage({
      id: getTrad("Editpage.BaseHeaderLayout.unsavedChangesPrompt"),
      defaultMessage:
        "You have unsaved changes. Are you sure you want to leave?",
    });

    this.editModalTitle = formatMessage({
      id: getTrad("Editpage.EditTitleModal.editModalTitle"),
      defaultMessage: "Edit Title",
    });

    this.cancel = formatMessage({
      id: getTrad("Editpage.EditTitleModal.cancel"),
      defaultMessage: "Cancel",
    });

    this.finish = formatMessage({
      id: getTrad("Editpage.EditTitleModal.finish"),
      defaultMessage: "Finish",
    });

    this.enterMainTitle = formatMessage({
      id: getTrad("Editpage.EditTitleModal.enterMainTitle"),
      defaultMessage: "Enter main title...",
    });

    this.mainTitleLabel = formatMessage({
      id: getTrad("Editpage.EditTitleModal.mainTitleLabel"),
      defaultMessage: "Main Title",
    });

    this.editMainTitleHint = formatMessage({
      id: getTrad("Editpage.EditTitleModal.editMainTitleHint"),
      defaultMessage:
        "The main title is shown at the top of the page for the atlas.",
    });

    this.mainTitleCannotBeEmpty = formatMessage({
      id: getTrad("Editpage.EditTitleModal.mainTitleCannotBeEmpty"),
      defaultMessage: "The main title cannot be empty!",
    });
  }
}

const EditPageStringsContext = createContext(null);

export default EditPageStringsContext;
