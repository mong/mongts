/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render, fireEvent } from "@testing-library/react";
import { FactBox } from "..";

test("Bokmål render", async () => {
  const title = "Dette er en tittel";
  const markdownText = "Dette er en kort tekst";
  const { container } = render(
    <FactBox boxTitle={title} boxContent={markdownText} lang="nb" id="tmp_nb" />
  );
  expect(container).toMatchSnapshot();
});

test("English render", async () => {
  const title = "Dette er en tittel";
  const markdownText =
    "Dette er en test\n\n# Hovedoverskrift\nLitt mer tekst\n## Underoverskrift\n### Dette er en overskrift!\n\n```sas\ndata test;\nset test2;\nvar = 0;\nrun;\n```\n\nOg litt tekst her";
  const { container, getByTestId } = render(
    <FactBox boxTitle={title} boxContent={markdownText} lang="en" id="tmp_en" />
  );
  expect(container).toMatchSnapshot();
  const firstSnap = container;
  //expand box
  fireEvent.click(getByTestId("factbox"));
  expect(container).toMatchSnapshot();
  fireEvent.click(getByTestId("factbox"));
  expect(container).toEqual(firstSnap);
});

test("Nynorsk render", async () => {
  const title = "Dette er ein tittel";
  const markdownText = "Dette er ein kort tekst";
  const { container } = render(
    <FactBox boxTitle={title} boxContent={markdownText} lang="nn" id="tmp_nn" />
  );
  expect(container).toMatchSnapshot();
});
