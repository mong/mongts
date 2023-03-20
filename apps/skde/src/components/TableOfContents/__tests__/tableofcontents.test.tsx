/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render, fireEvent } from "@testing-library/react";
import { TableOfContents } from "..";

const resultatbox1 = {
  overskrift: "Kirurgiske inngrep for endometriose",
  type: "resultatboks",
  tekst: "test",
};

const resultatbox2 = {
  overskrift: "Kirurgiske inngrep for noe annet",
  type: "resultatboks",
  tekst: "test",
};

const obj = [
  {
    overskrift: "Test en",
    innhold: [
      { type: "tekst", tekst: "Teksten min\n# Overskrift h1\nLitt mer tekst" },
    ],
  },
  { overskrift: "Test to", innhold: [resultatbox1, resultatbox2] },
  { overskrift: "Test tre", innhold: [{ type: "tekst", tekst: "Tekst" }] },
  { overskrift: "Test fire", innhold: [{ type: "tekst", tekst: "Tekst" }] },
];

const tocData = obj
  .filter((chapter) => chapter.overskrift)
  .map((chapter) => {
    const level = 1;
    const elemID = chapter.overskrift;
    const children = chapter.innhold
      ? chapter.innhold
          .filter((subChapter) => subChapter.type === "resultatboks")
          .map((subChapter) => ({
            level: 2,
            elemID: subChapter["overskrift"],
            children: [],
          }))
      : [];
    return { level, elemID, children };
  });

test("English menu", async () => {
  const { container, getAllByTestId } = render(
    <TableOfContents lang="en" tocData={tocData} />
  );
  const firstSnap = container;
  expect(container).toMatchSnapshot();
  // Expand
  fireEvent.click(getAllByTestId("toc_a_#test-to")[0]);
  expect(container).toMatchSnapshot();
  // Reduce
  fireEvent.click(getAllByTestId("toc_a_#test-to")[0]);
  expect(container).toEqual(firstSnap);
});

test("Norwegian menu", async () => {
  const { container } = render(<TableOfContents lang="no" tocData={tocData} />);
  expect(container).toMatchSnapshot();
});
