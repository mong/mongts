"use client";

import {
  parseAsArrayOf,
  parseAsBoolean,
  parseAsInteger,
  parseAsString,
} from "nuqs";

/** @public */
export const maxYear = 2025;
export const minYear = maxYear - 4;
export const defaultYear = new Date().getFullYear() - 1;
const defaultTreatmentUnits = ["Nasjonalt"];
export const defaultReviewYear = 2024;

/** @public */
export const minDG = 0.6;

/** @public */
export const mainQueryStateConfig = {
  selected_row: parseAsString,
  indicator: parseAsString,
  level: parseAsString,
  year: parseAsInteger.withDefault(defaultYear),
  selected_treatment_unit: parseAsString.withDefault(""),
  chart_type: parseAsString,
  chart_show_level: parseAsBoolean,
  chart_show_N: parseAsBoolean,
  registries: parseAsArrayOf(parseAsString).withDefault([]),
  units: parseAsArrayOf(parseAsString).withDefault(defaultTreatmentUnits),
  chart: parseAsString,
  chartsetting: parseAsString,
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

// https://gist.github.com/Myndex/997244b95d84788df96f4aab8b9edeb1
export const kellyColourPalette = [
  "var(--bar-3)",
  "var(--bar-1)",
  "#702c8c",
  "#db6917",
  "#96cde6",
  "#ba1c30",
  "#c0bd7f",
  "#7f7e80",
  "#5fa641",
  "#d485b2",
  "#4277b6",
  "#df8461",
  "#463397",
  "#e1a11a",
  "#91218c",
  "#e8e948",
  "#7e1510",
  "#92ae31",
  "#6f340d",
  "#d32b1e",
  "#2b3514",
  "#ebce2b",
];
