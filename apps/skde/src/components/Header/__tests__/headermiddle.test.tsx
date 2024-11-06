import React from "react";
import { render } from "@testing-library/react";
import { HeaderMiddle } from "../HeaderMiddle";

import { vi, it, describe, expect } from "vitest";

vi.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "/test-path",
  }),
}));

describe("HeaderMiddle component", () => {
  it("renders with default props", () => {
    const { container } = render(<HeaderMiddle title="Default Title" />);
    expect(container).toMatchSnapshot();
  });

  it("renders with custom title and children", () => {
    const { container } = render(
      <HeaderMiddle title="Custom Title" children="Custom Children" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with custom background color", () => {
    const { container } = render(
      <HeaderMiddle title="Custom Title" bgcolor="custom.bgcolor" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with custom maximum width", () => {
    const { container } = render(
      <HeaderMiddle title="Custom Title" maxWidth="lg" />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with NEXT_PUBLIC_VERIFY environment variable set", () => {
    process.env.NEXT_PUBLIC_VERIFY = "true";
    const { container } = render(<HeaderMiddle title="Custom Title" />);
    expect(container).toMatchSnapshot();
    process.env.NEXT_PUBLIC_VERIFY = undefined;
  });

  it("renders with NEXT_PUBLIC_VERIFY environment variable not set", () => {
    const { container } = render(<HeaderMiddle title="Custom Title" />);
    expect(container).toMatchSnapshot();
  });
});
