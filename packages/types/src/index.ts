export interface Description {
  id: string;
  dg_id: string | null;
  include: number | null;
  title: string | null;
  name: string | null;
  type: string | null;
  sformat: string;
  measure_unit: string | null;
  min_denominator: number | null;
  min_value: number | null;
  max_value: number | null;
  level_green: number | null;
  level_yellow: number | null;
  level_direction: number | null;
  short_description: string | null;
  long_description: string | null;
  registry_id: number;
  rname: string | null;
  full_name: string;
}

export interface Indicator {
  id?: number;
  ind_id: string;
  unit_level: string;
  unit_name: string;
  context: "caregiver" | "resident";
  year: number;
  denominator: number;
  var: number;
  level_direction: number | null;
  level_green: number | null;
  level_yellow: number | null;
  sformat: string | null;
  dg: number | null;
  delivery_time?: Date | null;
  delivery_latest_update?: Date | null;
  delivery_latest_affirm?: Date | null;
  type?: string | null;
  include: number | null;
  min_denominator: number | null;
  registry_id: number;
  registry_name: string;
  registry_full_name: string;
  registry_short_name: string;
  medfield_id: number;
  medfield_name: string;
  medfield_full_name: string;
  ind_short_description: string | null;
  ind_long_description: string | null;
  ind_title: string | null;
  ind_name: string | null;
}

export interface TuName {
  hospital: string;
  hf: string;
  hf_full: string;
  hf_sort: number;
  rhf: string;
  rhf_sort: number;
}

export interface NestedTreatmentUnitName {
  rhf: string;
  rhf_sort: number;
  hf: {
    hf: string;
    hf_full: string;
    hf_sort: number;
    hospital: string[];
  }[];
}

export interface OptsTu {
  label: "Sykehus" | "HF" | "RHF";
  options: {
    value: string;
    label: string;
  }[];
}

export interface RegisterName {
  id: number;
  rname: string;
  full_name: string;
  short_name: string;
  caregiver_data: 0 | 1 | null;
  resident_data: 0 | 1 | null;
  dg_data: 0 | 1 | null;
  url: string | null;
  description: string | null;
}

export type DataPoint = {
  id: number;
  unitName: string;
  year: number;
  var: number | null;
  denominator: number;
  dg: number | null;
  context: "caregiver" | "resident";
  deliveryTime: Date;
  affirmTime: Date;
  indicatorID: string;
};

export type IndicatorInfo = {
  indicatorID: string;
  indicatorTitle: string | null;
  levelGreen: number | null;
  levelYellow: number | null;
  levelDirection: number | null;
  minDenominator: number | null;
  minValue: number | null;
  maxValue: number | null;
  shortDescription: string | null;
  longDescription: string | null;
  indType:
    | "andel"
    | "beregnet_andel"
    | "antall"
    | "gjennomsnitt"
    | "median"
    | "dg_andel";
  sortingName: string | null;
  format: string | null;
  registerID: number;
};

export type IndicatorData = IndicatorInfo & { data?: DataPoint[] };

export type Registry = {
  registerFullName: string;
  registerName: string;
  registerShortName: string;
  registerID: number;
  medfieldID: number[];
};

export type RegisterData = Registry & {
  indicatorData: IndicatorData[];
};
