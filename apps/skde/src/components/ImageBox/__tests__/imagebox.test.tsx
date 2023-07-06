/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render } from "@testing-library/react";
import { ImageBox } from "..";

test("Standard render", async () => {
  const { container } = render(
    <ImageBox
      caption=""
      alt=""
      source="https://picsum.photos/id/237/100/100.jpg"
      width={400}
      height={250}
      title=""
    />
  );
  expect(container).toMatchSnapshot();
});

test("Render with some more text", async () => {
  const { container } = render(
    <ImageBox
      caption="Dette er en test"
      alt="Tilfeldig bilde fra picsum"
      source="https://picsum.photos/id/237/300/200"
      width={300}
      height={200}
      title="Æ Å"
    />
  );
  expect(container).toMatchSnapshot();
});
