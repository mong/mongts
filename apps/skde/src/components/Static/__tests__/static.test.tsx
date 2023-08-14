/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render } from "@testing-library/react";
import { PageContent } from "..";

type frontMatterType = {
  title: string;
  lang: "nb" | "en" | "nn";
  ingress?: string;
};

test("Bokmål render", async () => {
  const frontMatter: frontMatterType = {
    title: "Dette er en tittel",
    lang: "nb",
    ingress: "Dette er et sammendrag",
  };
  const markdownText = "Dette er en kort tekst";
  const { container } = render(
    <PageContent frontMatter={frontMatter} content={markdownText} />,
  );
  expect(container).toMatchSnapshot();
});

test("Nynorsk render", async () => {
  const frontMatter: frontMatterType = {
    title: "Dette er ein tittel",
    lang: "nn",
    ingress: "Dette er eit samandrag",
  };
  const markdownText = "Dette er ein kort tekst";
  const { container } = render(
    <PageContent frontMatter={frontMatter} content={markdownText} />,
  );
  expect(container).toMatchSnapshot();
});

test("English render", async () => {
  const frontMatter: frontMatterType = {
    title: "This is the title",
    lang: "en",
    ingress: "This is a summary",
  };
  const markdownText =
    "Dette er en test\n\n# Hovedoverskrift\nLitt mer tekst\n## Underoverskrift\n### Dette er en overskrift!\n\n```sas\ndata test;\nset test2;\nvar = 0;\nrun;\n```\n\nOg litt tekst her";
  const { container } = render(
    <PageContent frontMatter={frontMatter} content={markdownText} />,
  );
  expect(container).toMatchSnapshot();
});
