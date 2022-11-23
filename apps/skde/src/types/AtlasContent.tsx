export type Tekst = {
  type: "tekst";
  tekst: string;
};

export type Faktaboks = {
  type: "faktaboks";
  overskrift: string;
  tekst: string;
  lang: "nb" | "en" | "nn";
};

export type Resultatboks = {
  type: "resultatboks";
  overskrift: string;
  data: string;
  ingress: string;
  utvalg: string;
  resultat: string;
  lang: "nb" | "en" | "nn";
  publisert: Date;
  oppdatert: Date;
};

export type ChapterProps = {
  overskrift?: string;
  innhold: (Tekst | Faktaboks | Resultatboks)[];
  lang: "nb" | "en" | "nn";
};

export type ChaptersProps = {
  innhold: ChapterProps[];
  lang: "nb" | "en" | "nn";
};
