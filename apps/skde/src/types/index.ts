export type Atlas = {
  lang: "nb" | "en" | "nn";
  date: Date;
  filename: string;
  forfatter: "SKDE" | "Helse Førde";
  mainTitle: string;
  shortTitle: string;
  ingress: string;
  kapittel: ChapterType[];
  publisert: boolean;
};

export type ChapterType = {
  overskrift?: string;
  innhold: (Tekst | Faktaboks | Resultatboks)[];
};

export type Tekst = {
  type: "tekst";
  beskrivelse?: string;
  tekst: string;
};

export type Faktaboks = {
  type: "faktaboks";
  overskrift: string;
  tekst: string;
};

type Resultatboks = {
  type: "resultatboks";
  overskrift: string;
  data: string;
  ingress: string;
  utvalg: string;
  resultat: string;
  publisert: Date;
  oppdatert: Date;
  kart?: string;
};

export type AtlasData = {
  [k: string]: AtlasDataItem[];
};

export type AtlasDataItem =
  | LinechartItem
  | BarchartItem
  | TableItem
  | MapItem
  | DataItem;

type LinechartItem = {
  type: "linechart";
  data: string;
  x: string[];
  linevars: string[];
  linecolors: string[];
  linevarsLabels: { en: string[]; nb: string[]; nn: string[] };
};

export type BarchartItem = {
  type: "barchart";
  data: string;
  x: string[];
  y: string;
  format: string;
  xLabel: { en: string; nb: string; nn?: string };
  yLabel: { en: string; nb: string; nn?: string };
};

type TableItem = {
  type: "table";
  data: string;
  caption: { [k: string]: string };
  columns: {
    id: string;
    label_no: string;
    label_en: string;
    typeVar: "number" | "string";
    format?: string;
  }[];
};

type MapItem = {
  type: "map";
  data: string;
  x: string;
  jenks: { grense: number }[];
  caption: { [k: string]: string };
  format: string;
};

type DataItem = {
  type: "data";
  label: string;
  national: string;
  data: DataItemPoint[];
  jenks: { grense: number }[];
};

export type DataItemPoint = {
  [k: string]: number | string;
};
