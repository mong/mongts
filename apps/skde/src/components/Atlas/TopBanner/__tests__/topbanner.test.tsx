/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render } from "@testing-library/react";
import { TopBanner } from "..";

test("Bokmål render", async () => {
  const title = "Dette er en tittel";
  const { container } = render(
    <TopBanner mainTitle={title} ia={false} lang="nb" />,
  );
  //  expect(container).toMatchSnapshot();
});

test("Nynorsk render", async () => {
  const title = "Dette er ein tittel";
  const { container } = render(
    <TopBanner mainTitle={title} ia={false} lang="nn" />,
  );
  //  expect(container).toMatchSnapshot();
});

test("English render", async () => {
  const title = "This is a title";
  const { container } = render(
    <TopBanner mainTitle={title} ia={false} lang="en" />,
  );
  //  expect(container).toMatchSnapshot();
});

test("Random lang render", async () => {
  const title = "Dette er ein tittel";
  const { container } = render(
    <TopBanner mainTitle={title} ia={false} lang="qwerty" />,
  );
  //  expect(container).toMatchSnapshot();
});

test("IA render", async () => {
  const title = "Dette er en tittel";
  const { container } = render(
    <TopBanner mainTitle={title} ia={true} lang="nb" />,
  );
  //  expect(container).toMatchSnapshot();
});

test("IA english render", async () => {
  const title = "Dette er en tittel";
  const { container } = render(
    <TopBanner mainTitle={title} ia={true} lang="en" />,
  );
  //  expect(container).toMatchSnapshot();
});
