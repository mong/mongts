import {
  DelimitedArrayParam,
  NumberParam,
  StringParam,
  withDefault,
} from "use-query-params";

export interface appTextTypes {
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

export const minYear = 2017;
export const maxYear = 2022;
export const defaultYear = 2021;
export const mainQueryParamsConfig = {
  selected_row: withDefault(StringParam, undefined),
  indicator: withDefault(StringParam, undefined),
  level: withDefault(StringParam, undefined),
  year: withDefault(NumberParam, undefined),
  selected_treatment_units: withDefault(DelimitedArrayParam, undefined),
  chart_type: withDefault(StringParam, undefined),
};
