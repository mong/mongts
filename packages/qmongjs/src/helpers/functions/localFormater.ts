import { formatLocale, FormatLocaleDefinition } from "d3-format";

export function customFormat(
  numberFormat: string,
  lang?: "en" | "nb" | "nn" | "no",
) {
  const formatDefinition: FormatLocaleDefinition =
    lang === "en"
      ? {
          decimal: ".",
          thousands: ",",
          grouping: [3],
          currency: ["USD", ""],
          percent: "%",
        }
      : {
          decimal: ",",
          thousands: "\u202f",
          grouping: [3],
          currency: ["NOK", ""],
          percent: "\u202f%",
        };
  try {
    return formatLocale(formatDefinition).format(numberFormat);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return formatLocale(formatDefinition).format(".0f");
  }
}
