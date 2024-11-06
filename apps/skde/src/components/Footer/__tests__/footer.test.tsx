import React from "react";
import { render } from "@testing-library/react";
import { Footer } from "../.";
import { vi, describe, it, expect } from "vitest";

vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({
    style: {
      fontFamily: "mocked",
    },
  }),
}));

describe("Footer component", () => {
  it("renders with default props", () => {
    const { container } = render(<Footer page="pasientstrømmer" />);
    expect(container).toMatchSnapshot();
  });

  it('renders with page prop set to "behandlingskvalitet"', () => {
    const { container } = render(<Footer page="behandlingskvalitet" />);
    expect(container).toMatchSnapshot();
  });

  it('renders with page prop set to "helseatlas"', () => {
    const { container } = render(<Footer page="helseatlas" />);
    expect(container).toMatchSnapshot();
  });

  it("renders with maxWidth prop set to false", () => {
    const { container } = render(
      <Footer page="sykehusprofil" maxWidth={false} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with className prop set to a custom class name", () => {
    const { container } = render(
      <Footer page="sykehusprofil" className="custom-class-name" />,
    );
    expect(container).toMatchSnapshot();
  });
});
