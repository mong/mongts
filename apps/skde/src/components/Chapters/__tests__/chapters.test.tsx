/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render } from "@testing-library/react";
import { Chapters } from "..";

import { vi } from "vitest";
import { Faktaboks, Tekst, Atlas, AtlasData } from "../../../types";

const tekst_nb: Tekst = {
  type: "tekst",
  tekst: "Dette er en tekst",
};

const tekst_nb2: Tekst = {
  type: "tekst",
  tekst:
    'Dette er en test\n\n# Hovedoverskrift\n\n![Menisk, utvikling i antall inngrep i perioden 2013–2017](https://picsum.photos/id/237/100/100.jpg "Menisk, utvikling i antall inngrep pr. 100 000 innbyggere i perioden 2013–2017, justert for kjønn og alder. Fordelt på opptaksområder og offentlig eller privat behandler.")\n\n',
};

const tekst_en: Tekst = {
  type: "tekst",
  tekst:
    'Dette er en test\n\n# Hovedoverskrift\n\n![Menisk, utvikling i antall inngrep i perioden 2013–2017](https://picsum.photos/id/237/100/100.jpg "Menisk, utvikling i antall inngrep pr. 100 000 innbyggere i perioden 2013–2017, justert for kjønn og alder. Fordelt på opptaksområder og offentlig eller privat behandler.")\n\n',
};

const tekst_nn: Tekst = {
  type: "tekst",
  tekst:
    'Dette er en test\n\n# Hovedoverskrift\n\n![Menisk, utvikling i antall inngrep i perioden 2013–2017](https://picsum.photos/id/237/100/100.jpg "Menisk, utvikling i antall inngrep pr. 100 000 innbyggere i perioden 2013–2017, justert for kjønn og alder. Fordelt på opptaksområder og offentlig eller privat behandler.")\n\n',
};

const faktaboks_nb: Faktaboks = {
  type: "faktaboks",
  overskrift: "Dette er en overskrift",
  tekst:
    "Dette er en test\n\n# Hovedoverskrift\nLitt mer tekst\n## Underoverskrift\n### Dette er en overskrift!\n\n```sas\ndata test;\nset test2;\nvar = 0;\nrun;\n```\n\nOg litt tekst her",
};

const faktaboks_nb2: Faktaboks = {
  type: "faktaboks",
  overskrift: "Dette er en overskrift",
  tekst:
    'Dette er en test\n\n# Hovedoverskrift\n\n![Menisk, utvikling i antall inngrep i perioden 2013–2017](https://picsum.photos/id/237/100/100.jpg "Menisk, utvikling i antall inngrep pr. 100 000 innbyggere i perioden 2013–2017, justert for kjønn og alder. Fordelt på opptaksområder og offentlig eller privat behandler.")\n\n',
};

const faktaboks_en: Faktaboks = {
  type: "faktaboks",
  overskrift: "Dette er en overskrift",
  tekst:
    "Dette er en test\n\n# Hovedoverskrift\nLitt mer tekst\n## Underoverskrift\n### Dette er en overskrift!\n\n```sas\ndata test;\nset test2;\nvar = 0;\nrun;\n```\n\nOg litt tekst her",
};

const faktaboks_nn: Faktaboks = {
  type: "faktaboks",
  overskrift: "Dette er en overskrift",
  tekst:
    "Dette er en test\n\n# Hovedoverskrift\nLitt mer tekst\n## Underoverskrift\n### Dette er en overskrift!\n\n```sas\ndata test;\nset test2;\nvar = 0;\nrun;\n```\n\nOg litt tekst her",
};

export const blocks_en = [tekst_en, faktaboks_en];
export const blocks_nn = [tekst_nn, faktaboks_nn];
export const blocks_nb = [tekst_nb, faktaboks_nb, tekst_nb2, faktaboks_nb2];

vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
    display: "swap",
    style: {
      fontFamily: "Plus Jakarta Sans",
    },
  }),
}));

test("Bokmål render", async () => {
  const atlas = {
    lang: "nb",
    kapittel: [{ innhold: blocks_nb }],
  };

  const { container } = render(
    <Chapters atlas={atlas as Atlas} atlasData={{} as AtlasData} />,
  );
  expect(container).toMatchSnapshot();
});

test("Nynorsk render", async () => {
  const atlas = {
    lang: "nn",
    kapittel: [{ innhold: blocks_nn }],
  };

  const { container } = render(
    <Chapters atlas={atlas as Atlas} atlasData={{} as AtlasData} />,
  );
  expect(container).toMatchSnapshot();
});

test("English render", async () => {
  const atlas = {
    lang: "en",
    kapittel: [{ innhold: blocks_en }],
  };

  const { container } = render(
    <Chapters atlas={atlas as Atlas} atlasData={{} as AtlasData} />,
  );
  expect(container).toMatchSnapshot();
});

test("Mix render", async () => {
  const atlas = {
    lang: "nb",
    kapittel: [
      {
        overskrift: "Dette er en miks av mye",
        innhold: blocks_en.concat(blocks_nb),
      },
    ],
  };

  const { container } = render(
    <Chapters atlas={atlas as Atlas} atlasData={{} as AtlasData} />,
  );
  expect(container).toMatchSnapshot();
});
