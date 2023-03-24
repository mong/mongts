type Tekst = {
  type: "tekst";
  tekst: string;
  lang: "nb" | "en" | "nn";
};

type Faktaboks = {
  type: "faktaboks";
  overskrift: string;
  tekst: string;
  lang: "nb" | "en" | "nn";
};

type Resultatboks = {
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

const tekst_nb: Tekst = {
  type: "tekst",
  tekst: "Dette er en tekst",
  lang: "nb",
};

const tekst_nb2: Tekst = {
  type: "tekst",
  tekst:
    'Dette er en test\n\n# Hovedoverskrift\n\n![Menisk, utvikling i antall inngrep i perioden 2013–2017](https://picsum.photos/id/237/100/100.jpg "Menisk, utvikling i antall inngrep pr. 100 000 innbyggere i perioden 2013–2017, justert for kjønn og alder. Fordelt på opptaksområder og offentlig eller privat behandler.")\n\n',
  lang: "nb",
};

const tekst_en: Tekst = {
  type: "tekst",
  tekst:
    'Dette er en test\n\n# Hovedoverskrift\n\n![Menisk, utvikling i antall inngrep i perioden 2013–2017](https://picsum.photos/id/237/100/100.jpg "Menisk, utvikling i antall inngrep pr. 100 000 innbyggere i perioden 2013–2017, justert for kjønn og alder. Fordelt på opptaksområder og offentlig eller privat behandler.")\n\n',
  lang: "en",
};

const tekst_nn: Tekst = {
  type: "tekst",
  tekst:
    'Dette er en test\n\n# Hovedoverskrift\n\n![Menisk, utvikling i antall inngrep i perioden 2013–2017](https://picsum.photos/id/237/100/100.jpg "Menisk, utvikling i antall inngrep pr. 100 000 innbyggere i perioden 2013–2017, justert for kjønn og alder. Fordelt på opptaksområder og offentlig eller privat behandler.")\n\n',
  lang: "nn",
};

const faktaboks_nb: Faktaboks = {
  type: "faktaboks",
  overskrift: "Dette er en overskrift",
  tekst:
    "Dette er en test\n\n# Hovedoverskrift\nLitt mer tekst\n## Underoverskrift\n### Dette er en overskrift!\n\n```sas\ndata test;\nset test2;\nvar = 0;\nrun;\n```\n\nOg litt tekst her",
  lang: "nb",
};

const faktaboks_nb2: Faktaboks = {
  type: "faktaboks",
  overskrift: "Dette er en overskrift",
  tekst:
    'Dette er en test\n\n# Hovedoverskrift\n\n![Menisk, utvikling i antall inngrep i perioden 2013–2017](https://picsum.photos/id/237/100/100.jpg "Menisk, utvikling i antall inngrep pr. 100 000 innbyggere i perioden 2013–2017, justert for kjønn og alder. Fordelt på opptaksområder og offentlig eller privat behandler.")\n\n',
  lang: "nb",
};

const faktaboks_en: Faktaboks = {
  type: "faktaboks",
  overskrift: "Dette er en overskrift",
  tekst:
    "Dette er en test\n\n# Hovedoverskrift\nLitt mer tekst\n## Underoverskrift\n### Dette er en overskrift!\n\n```sas\ndata test;\nset test2;\nvar = 0;\nrun;\n```\n\nOg litt tekst her",
  lang: "en",
};

const faktaboks_nn: Faktaboks = {
  type: "faktaboks",
  overskrift: "Dette er en overskrift",
  tekst:
    "Dette er en test\n\n# Hovedoverskrift\nLitt mer tekst\n## Underoverskrift\n### Dette er en overskrift!\n\n```sas\ndata test;\nset test2;\nvar = 0;\nrun;\n```\n\nOg litt tekst her",
  lang: "nn",
};

export const blocks_en = [tekst_en, faktaboks_en];
export const blocks_nn = [tekst_nn, faktaboks_nn];
export const blocks_nb = [tekst_nb, faktaboks_nb, tekst_nb2, faktaboks_nb2];

const date1 = new Date("October 13, 2014 11:13:00");
const date2 = new Date("October 23, 2014 11:13:00");

const resultatboks_nb: Resultatboks = {
  type: "resultatboks",
  overskrift: "Dette er en overskrift",
  data: "test_data.json",
  ingress: "Dette er en ingress",
  utvalg: "Dette er et utvalg",
  resultat: "Dette er et resultat",
  lang: "nb",
  publisert: date1,
  oppdatert: date2,
};
