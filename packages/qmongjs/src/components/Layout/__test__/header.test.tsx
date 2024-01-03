import { render } from "@testing-library/react";
import { it, expect } from "vitest";

import { Header } from "../Header";

it("Header renders", async () => {
  const { container } = render(<Header />);

  expect(container).toMatchSnapshot();
});
