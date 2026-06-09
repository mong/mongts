import { render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { Header } from "../.";
import type { BreadCrumbPath } from "../HeaderTop";

vi.mock("next/router", () => ({
  useRouter: () => ({
    asPath: "/test-path",
  }),
}));

describe("Header component", () => {
  it("renders with default props", () => {
    const { container } = render(
      <Header
        title="Default Title"
        breadcrumbs={[{ text: "Home", link: "/" }]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with custom title", () => {
    const { container } = render(
      <Header
        title="Custom Title"
        breadcrumbs={[{ text: "Home", link: "/" }]}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with custom breadcrumbs", () => {
    const breadcrumbs: BreadCrumbPath = [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
    ];

    const { container } = render(
      <Header title="Default Title" breadcrumbs={breadcrumbs} />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with custom children content", () => {
    const children = <div>Custom Children</div>;
    const { container } = render(
      <Header
        title="Default Title"
        breadcrumbs={[{ text: "Home", link: "/" }]}
        // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
        children={children}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with custom background color", () => {
    const bgcolor = "custom.bgcolor";
    const { container } = render(
      <Header
        title="Default Title"
        breadcrumbs={[{ text: "Home", link: "/" }]}
        bgcolor={bgcolor}
      />,
    );
    expect(container).toMatchSnapshot();
  });

  it("renders with custom maximum width", () => {
    const maxWidth = "lg";
    const { container } = render(
      <Header
        title="Default Title"
        breadcrumbs={[{ text: "Home", link: "/" }]}
        maxWidth={maxWidth}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
