import {
  BooleanParam,
  DelimitedArrayParam,
  NumberParam,
  StringParam,
  withDefault,
} from "use-query-params";

/** @public */
export const defaultYear = 2024;

/** @public */
export const defaultReviewYear = 2024;

/** @public */
export const minDG = 0.6;

/** @public */
export const mainQueryParamsConfig = {
  selected_row: withDefault(StringParam, undefined),
  indicator: withDefault(StringParam, undefined),
  level: withDefault(StringParam, undefined),
  year: withDefault(NumberParam, undefined),
  selected_treatment_units: withDefault(DelimitedArrayParam, undefined),
  chart_type: withDefault(StringParam, undefined),
  chart_show_level: withDefault(BooleanParam, undefined),
  chart_show_N: withDefault(BooleanParam, undefined),
  registries: withDefault(DelimitedArrayParam, undefined),
  units: withDefault(DelimitedArrayParam, undefined),
};

/** List of hospitals shown on main page of Behandlingskvalitet and Sykehusprofil apps. */
export const mainHospitals = [
  "Hammerfest",
  "Kirkenes",
  "Harstad",
  "Narvik",
  "Tromsø",
  "Bodø",
  "Lofoten",
  "Vesterålen",
  "Mo i Rana",
  "Mosjøen",
  "Sandnessjøen",
  "Levanger",
  "Namsos",
  "Orkdal",
  "St. Olav",
  "Kristiansund",
  "Molde",
  "Volda",
  "Ålesund",
  "Haraldsplass",
  "Førde",
  "Lærdal",
  "Nordfjord",
  "Haukeland",
  "Voss",
  "Haugesund",
  "Odda",
  "Stord",
  "Egersund",
  "Stavanger",
  "Kalnes",
  "Moss",
  "Ahus Nordbyhagen",
  "Kongsvinger",
  "Aker",
  "Radiumhospitalet",
  "Rikshospitalet",
  "Ullevål",
  "Lovisenberg",
  "Diakonhjemmet",
  "Elverum",
  "Gjøvik",
  "Hamar",
  "Lillehammer",
  "Tynset",
  "Bærum",
  "Drammen",
  "Kongsberg",
  "Ringerike",
  "Larvik",
  "Tønsberg",
  "Notodden",
  "Skien",
  "Arendal",
  "Flekkefjord",
  "Kristiansand",
];
