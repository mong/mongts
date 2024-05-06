/**
 * To view a rendered version of all the snapshots:
 *
 * Copy the contents of ./__snapshots__/index.tsx.snap
 * Go to https://codesandbox.io/s/snapshot-viewer-lqjjsm?file=/src/snapshots.js
 * Replace the contents with what you copied
 */

import { render } from "@testing-library/react";
import { MainBanner } from "..";
import { vi } from "vitest";

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
  const { container } = render(<MainBanner lang="no" />);
  expect(container).toMatchSnapshot();
});

test("English render", async () => {
  const { container } = render(<MainBanner lang="en" />);
  expect(container).toMatchSnapshot();
});
