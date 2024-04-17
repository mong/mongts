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
  rhf: string;
}

export interface NestedTreatmentUnitName {
  rhf: string;
  hf: {
    hf: string;
    hf_full: string;
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
