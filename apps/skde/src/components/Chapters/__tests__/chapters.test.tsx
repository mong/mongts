/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render } from "@testing-library/react";
import { Chapters, ChapterProps } from "..";
import {
  blocks_en,
  blocks_nn,
  blocks_nb,
} from "../../../../test/test_data/chapters";

test("Bokmål render", async () => {
  const chapters: ChapterProps[] = [
    {
      innhold: blocks_nb,
      lang: "nb",
    },
  ];

  const { container } = render(<Chapters innhold={chapters} lang="nb" />);
  expect(container).toMatchSnapshot();
});

test("Nynorsk render", async () => {
  const chapters: ChapterProps[] = [
    {
      innhold: blocks_nn,
      lang: "nn",
    },
  ];

  const { container } = render(<Chapters innhold={chapters} lang="nn" />);
  expect(container).toMatchSnapshot();
});

test("English render", async () => {
  const chapters: ChapterProps[] = [
    {
      innhold: blocks_en,
      lang: "en",
    },
  ];

  const { container } = render(<Chapters innhold={chapters} lang="en" />);
  expect(container).toMatchSnapshot();
});

test("Mix render", async () => {
  const chapters: ChapterProps[] = [
    {
      overskrift: "Dette er en miks av mye",
      innhold: blocks_en.concat(blocks_nb),
      lang: "en",
    },
  ];

  const { container } = render(<Chapters innhold={chapters} lang="nn" />);
  expect(container).toMatchSnapshot();
});
