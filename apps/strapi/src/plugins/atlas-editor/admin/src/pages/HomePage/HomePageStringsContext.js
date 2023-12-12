import { createContext } from "react";
import getTrad from "../../utils/getTrad";

export class HomePageStrings {
  constructor(formatMessage) {
    this.formatMessage = formatMessage;

    this.title = formatMessage({
      id: getTrad("Homepage.BaseHeaderLayout.title"),
      defaultMessage: "Helseatlas",
    });

    this.subTitle = formatMessage({
      id: getTrad("Homepage.BaseHeaderLayout.subtitle"),
      defaultMessage: "Manage health atlases",
    });

    this.emptyStateContent = formatMessage({
      id: getTrad("Homepage.EmptyStateLayout.content"),
      defaultMessage: "Create the first atlas",
    });

    this.createButtonText = formatMessage({
      id: getTrad("Homepage.createButtonText"),
      defaultMessage: "Create new atlas",
    });

    this.id = formatMessage({
      id: getTrad("Homepage.Table.id"),
      defaultMessage: "ID",
    });

    this.mainTitle = formatMessage({
      id: getTrad("Homepage.Table.mainTitle"),
      defaultMessage: "Main Title",
    });

    this.shortTitle = formatMessage({
      id: getTrad("Homepage.Table.shortTitle"),
      defaultMessage: "Short Title",
    });

    this.published = formatMessage({
      id: getTrad("Homepage.Table.published"),
      defaultMessage: "Published",
    });

    this.created = formatMessage({
      id: getTrad("Homepage.Table.created"),
      defaultMessage: "Created",
    });

    this.updated = formatMessage({
      id: getTrad("Homepage.Table.updated"),
      defaultMessage: "Updated",
    });

    this.yes = formatMessage({
      id: getTrad("Homepage.Table.yes"),
      defaultMessage: "Yes",
    });

    this.no = formatMessage({
      id: getTrad("Homepage.Table.no"),
      defaultMessage: "No",
    });

    this.edit = formatMessage({
      id: getTrad("Homepage.Table.edit"),
      defaultMessage: "Edit",
    });

    this.delete = formatMessage({
      id: getTrad("Homepage.Table.delete"),
      defaultMessage: "Delete",
    });

    this.noEntriesFound = formatMessage({
      id: getTrad("Homepage.Subtitle.noEntriesFound"),
      defaultMessage: "No entries found",
    });

    this.oneEntryFound = formatMessage({
      id: getTrad("Homepage.Subtitle.oneEntryFound"),
      defaultMessage: "One entry found",
    });

    this.entriesFound = formatMessage({
      id: getTrad("Homepage.Subtitle.entriesFound"),
      defaultMessage: "entries found",
    });

    this.search = formatMessage({
      id: getTrad("Homepage.AtlasSearch.search"),
      defaultMessage: "Search",
    });

    this.clearLabel = formatMessage({
      id: getTrad("Homepage.AtlasSearch.clearLabel"),
      defaultMessage: "Clear",
    });
  }

  numEntriesFound(numEntries) {
    switch (numEntries) {
      case 0:
        return this.noEntriesFound;
      case 1:
        return this.oneEntryFound;
      default:
        return `${numEntries} ${this.entriesFound}`;
    }
  }
}

const HomePageStringsContext = createContext(null);

export default HomePageStringsContext;
