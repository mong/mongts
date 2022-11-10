import {
  DelimitedArrayParam,
  NumberParam,
  StringParam,
  withDefault,
} from "use-query-params";

export interface appTextTypes {
  menus: { unit: string; year: string };
  indicators: {
    high: { text: string; icon: string };
    moderate: { text: string; icon: string };
    low: { text: string; icon: string };
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
    high: { text: "Høy måloppnåelse", icon: "fa fa-fas fa-circle" },
    moderate: { text: "Moderat måloppnåelse", icon: "fa fa-fas fa-adjust" },
    low: { text: "Lav måloppnåelse", icon: "fa fa-circle-o" },
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
export const maxYear = 2021;
export const defaultYear = 2021;
export const mainQueryParamsConfig = {
  selected_row: withDefault(StringParam, undefined),
  indicator: withDefault(StringParam, undefined),
  level: withDefault(StringParam, undefined),
  year: withDefault(NumberParam, undefined),
  selected_treatment_units: withDefault(DelimitedArrayParam, undefined),
  chart_type: withDefault(StringParam, undefined),
};

const appConfig = { app_text };

export default appConfig;
