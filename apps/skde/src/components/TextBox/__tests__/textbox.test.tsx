/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render } from "@testing-library/react";
import { TextBox } from "..";

test("Standard render", async () => {
  const markdownText = "Dette er en test";
  const { container } = render(<TextBox lang="en">{markdownText}</TextBox>);
  expect(container).toMatchSnapshot();
});
test("Longer text", async () => {
  const markdownText =
    "Dette er en test\n\n# Hovedoverskrift\nLitt mer tekst\n## Underoverskrift\n### Dette er en overskrift!\n\n```sas\ndata test;\nset test2;\nvar = 0;\nrun;\n```\n\nOg litt tekst her";
  const { container } = render(<TextBox lang="nb">{markdownText}</TextBox>);
  expect(container).toMatchSnapshot();
});

test("Text with image", async () => {
  const markdownText =
    'Dette er en test\n\n# Hovedoverskrift\n\n![Menisk, utvikling i antall inngrep i perioden 2013–2017](https://picsum.photos/id/237/100/100.jpg "Menisk, utvikling i antall inngrep pr. 100 000 innbyggere i perioden 2013–2017, justert for kjønn og alder. Fordelt på opptaksområder og offentlig eller privat behandler.")\n\n';
  const { container } = render(<TextBox lang="nn">{markdownText}</TextBox>);
  expect(container).toMatchSnapshot();
});

test("Text with image, english", async () => {
  const markdownText =
    'Dette er en test\n\n# Hovedoverskrift\n\n![Menisk, utvikling i antall inngrep i perioden 2013–2017](https://picsum.photos/id/237/100/100.jpg "Menisk, utvikling i antall inngrep pr. 100 000 innbyggere i perioden 2013–2017, justert for kjønn og alder. Fordelt på opptaksområder og offentlig eller privat behandler.")\n\n';
  const { container } = render(<TextBox lang="en">{markdownText}</TextBox>);
  expect(container).toMatchSnapshot();
});
