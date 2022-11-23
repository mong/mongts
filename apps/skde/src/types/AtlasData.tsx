export type AtlasData = {
  innbyggere: number;
  bohf: string;
  antall1: number;
  antall2: number;
  andelRate1: number;
  andelRate2: number;
  rate1: number;
  rate2: number;
  year: number | string;
  rateSnitt: number;
  rate2018: number;
  rate2019: number;
  rate2020: number;
  pasienter: number;
  kontakter: number;
  kont_pr_pas: number;
};

type Jenks = {
  cluster: number;
  max: number;
  min: number;
  lag_min: number;
  grense: number;
};

type Labels = {
  nb?: string;
  nn?: string;
  en?: string;
};

type LabelsArray = {
  nb?: string[];
  nn?: string[];
  en?: string[];
};

type TableColumn = {
  id: string;
  label_no: string;
  label_en: string;
  typeVar: string;
  format: string;
};

export type BarchartTypes = {
  type: "barchart";
  data: string;
  x: string | string[];
  y: string | string[];
  xlabel: Labels;
  ylabel: Labels;
  annualVar?: string[];
  annualVarLabels?: Labels;
  xLegend?: Labels;
  format?: string;
};

export type TableTypes = {
  type: "table";
  data: string;
  caption: Labels;
  columns: TableColumn[];
};

export type MapTypes = {
  type: "map";
  data: string;
  x: string;
  caption: Labels;
  jenks: Jenks[];
  format?: string;
};

export type DataTypes = {
  type: "data";
  label: string;
  description: string;
  national: string;
  data: AtlasData[];
};

export type DataProps = {
  [x: string]: any;
  innhold: (BarchartTypes | TableTypes | MapTypes | DataTypes)[];
};
