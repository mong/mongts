/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render } from "@testing-library/react";
import { Menu } from "..";

test("English menu", async () => {
  const { container } = render(<Menu lang="en" />);
  expect(container).toMatchSnapshot();
});

test("Norwegian menu", async () => {
  const { container } = render(<Menu lang="no" />);
  expect(container).toMatchSnapshot();
});
