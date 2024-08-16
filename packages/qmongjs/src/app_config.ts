import {
  DelimitedArrayParam,
  NumberParam,
  StringParam,
  BooleanParam,
  withDefault,
} from "use-query-params";

interface appTextTypes {
  menus: { unit: string; year: string };
  indicators: {
    high: { text: string };
    moderate: { text: string };
    low: { text: string };
  };
  table: {
    main_column: string;
    national_column: string;
    desired_level: string;
  };
  tu_list: { header_text: string; max_nr_tu: number };
}

export const app_text: appTextTypes = {
  menus: {
    unit: "Velg behandlingssted",
    year: "År:",
  },
  indicators: {
    high: { text: "Høy måloppnåelse" },
    moderate: { text: "Moderat måloppnåelse" },
    low: { text: "Lav måloppnåelse" },
  },
  table: {
    main_column: "Kvalitetsindikator",
    national_column: "Nasjonalt",
    desired_level: "Ønsket målnivå",
  },
  tu_list: {
    header_text: "Velg behandlingsenheter",
    max_nr_tu: 5,
  },
};

export const maxYear = 2024;
export const minYear = maxYear - 4;
export const defaultYear = 2023;
export const mainQueryParamsConfig = {
  selected_row: withDefault(StringParam, undefined),
  indicator: withDefault(StringParam, undefined),
  level: withDefault(StringParam, undefined),
  year: withDefault(NumberParam, undefined),
  selected_treatment_units: withDefault(DelimitedArrayParam, undefined),
  chart_type: withDefault(StringParam, undefined),
  chart_show_level: withDefault(BooleanParam, undefined),
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
