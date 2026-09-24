"use client";

import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs";
import {
  BooleanParam,
  DelimitedArrayParam,
  NumberParam,
  StringParam,
  withDefault,
} from "use-query-params";

export const maxYear = 2025;
export const minYear = maxYear - 4;
export const defaultYear = 2025;
const defaultTreatmentUnits = ["Nasjonalt"];

/** @public */
export const defaultReviewYear = 2024;

/** @public */
export const minDG = 0.6;

/** @public */
export const mainQueryStateConfig = {
  selected_row: parseAsString,
  indicator: parseAsString,
  level: parseAsString,
  year: parseAsInteger.withDefault(defaultYear),
  selected_treatment_units: parseAsArrayOf(parseAsString),
  chart_type: parseAsString,
  chart_show_level: parseAsBoolean,
  chart_show_N: parseAsBoolean,
  registries: parseAsArrayOf(parseAsString),
  units: parseAsArrayOf(parseAsString).withDefault(defaultTreatmentUnits),
  chart: parseAsString,
  chartsetting: parseAsString,
};

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
  chart: withDefault(StringParam, undefined),
  chartsetting: withDefault(StringParam, undefined),
};

/** List of hospitals shown on main page of Behandlingskvalitet and Sykehusprofil apps **/
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

export const levelGreenColours = ["#D5F6E8", "#66CCA1", "#32634E"];
export const levelYellowColours = ["#F5F0D5", "#E8D360", "#483D01"];
export const levelRedColours = ["#F0DEDB", "#CC7566", "#491006"];
