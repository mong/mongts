/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render } from "@testing-library/react";
import { Markdown } from "..";

test("Standard render", async () => {
  const markdownText = "Dette er en test";
  const { container } = render(<Markdown>{markdownText}</Markdown>);
  expect(container).toMatchSnapshot();
});
test("Longer text", async () => {
  const markdownText =
    "Dette er en test\n\n# Hovedoverskrift\nLitt mer tekst\n## Underoverskrift\n### Dette er en overskrift!\n\n```sas\ndata test;\nset test2;\nvar = 0;\nrun;\n```\n\nOg litt tekst her";
  const { container } = render(<Markdown>{markdownText}</Markdown>);
  expect(container).toMatchSnapshot();
});

test("Text with image", async () => {
  const markdownText =
    'Dette er en test\n\n# Hovedoverskrift\n\n![Menisk, utvikling i antall inngrep i perioden 2013–2017](https://picsum.photos/id/237/100/100.jpg "Menisk, utvikling i antall inngrep pr. 100 000 innbyggere i perioden 2013–2017, justert for kjønn og alder. Fordelt på opptaksområder og offentlig eller privat behandler.")\n\n';
  const { container } = render(<Markdown>{markdownText}</Markdown>);
  expect(container).toMatchSnapshot();
});

test("Text with image, language english", async () => {
  const markdownText =
    'Dette er en test\n\n# Hovedoverskrift\n\n![Menisk, utvikling i antall inngrep i perioden 2013–2017](https://picsum.photos/id/237/100/100.jpg "Menisk, utvikling i antall inngrep pr. 100 000 innbyggere i perioden 2013–2017, justert for kjønn og alder. Fordelt på opptaksområder og offentlig eller privat behandler.")\n\n';
  const { container } = render(<Markdown lang="en">{markdownText}</Markdown>);
  expect(container).toMatchSnapshot();
});

test("Text with table", async () => {
  const markdownText =
    "Listen under viser hvilke helseforetak eller sykehus det er definert opptaksområder for og kortnavnene på disse som brukes i atlaset.\n\n| **Opptaksområde for**                 | **Kortnavn**    |\n| ------------------------------------- | --------------- |\n| Finnmarkssykehuset HF                 | Finnmark        |\n| Universitetssykehuset i Nord-Norge HF | UNN             |\n| Nordlandssykehuset HF                 | Nordland        |\n| Helgelandssykehuset HF                | Helgeland       |\n| Helse Nord-Trøndelag HF               | Nord-Trøndelag  |\n| St. Olavs hospital HF                 | St. Olavs       |\n| Helse Møre og Romsdal HF              | Møre og Romsdal |\n| Helse Førde HF                        | Førde           |\n| Helse Bergen HF                       | Bergen          |\n| Helse Fonna HF                        | Fonna           |\n| Helse Stavanger HF                    | Stavanger       |\n| Sykehuset Østfold HF                  | Østfold         |\n| Akershus universitetssykehus HF       | Akershus        |\n| Oslo universitetssykehus HF           | OUS             |\n| Lovisenberg diakonale sykehus         | Lovisenberg     |\n| Diakonhjemmet sykehus                 | Diakonhjemmet   |\n| Sykehuset Innlandet HF                | Innlandet       |\n| Vestre Viken HF                       | Vestre Viken    |\n| Sykehuset i Vestfold HF               | Vestfold        |\n| Sykehuset Telemark HF                 | Telemark        |\n| Sørlandet sykehus HF                  | Sørlandet       |";
  const { container } = render(<Markdown lang="en">{markdownText}</Markdown>);
  expect(container).toMatchSnapshot();
});

test("Text with details tag", async () => {
  const markdownText =
    "## Noe tekst\n<details><summary>Ledelse</summary>O-Store-Sol\n\n</details>";
  const { container } = render(<Markdown lang="en">{markdownText}</Markdown>);
  expect(container).toMatchSnapshot();
});

test("Text with url", async () => {
  const markdownText =
    "## Noe tekst\nTest [om](https://no.wikipedia.org) lenke fungerer\n";
  const { container } = render(<Markdown lang="en">{markdownText}</Markdown>);
  expect(container).toMatchSnapshot();
});
