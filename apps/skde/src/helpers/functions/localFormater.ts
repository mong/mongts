import { formatLocale, FormatLocaleDefinition } from "d3-format";

const formatDefinition: FormatLocaleDefinition = {
  decimal: ",",
  thousands: "\u202f",
  grouping: [3],
  currency: ["NOK", ""],
  percent: "\u202f%",
};

export const customFormat = formatLocale(formatDefinition).format;

const formatDefinitionEng: FormatLocaleDefinition = {
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["USD", ""],
  percent: "%",
};

export const customFormatEng = formatLocale(formatDefinitionEng).format;
