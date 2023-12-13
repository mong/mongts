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
  }
}

const EditPageStringsContext = createContext(null);

export default EditPageStringsContext;
