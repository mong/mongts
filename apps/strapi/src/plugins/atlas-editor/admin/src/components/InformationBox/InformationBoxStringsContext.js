import { createContext } from "react";
import getTrad from "../../utils/getTrad";

export class InformationBoxStrings {
  constructor(formatMessage) {
    this.formatMessage = formatMessage;

    this.information = formatMessage({
      id: getTrad("Component.Information.information"),
      defaultMessage: "Information",
    });

    this.created = formatMessage({
      id: getTrad("Component.Information.created"),
      defaultMessage: "Created",
    });

    this.by = formatMessage({
      id: getTrad("Component.Information.by"),
      defaultMessage: "By",
    });

    this.lastUpdate = formatMessage({
      id: getTrad("Component.Information.lastUpdate"),
      defaultMessage: "Last update",
    });

    this.publishedAt = formatMessage({
      id: getTrad("Component.Information.publishedAt"),
      defaultMessage: "Last published",
    });
  }
}

const InformationBoxStringsContext = createContext(null);

export default InformationBoxStringsContext;
