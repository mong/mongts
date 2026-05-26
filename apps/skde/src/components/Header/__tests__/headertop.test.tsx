import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { type BreadCrumbPath, HeaderTop } from "../HeaderTop";

describe("HeaderTop component", () => {
  it("renders with breadcrumbs", () => {
    const breadcrumbs: BreadCrumbPath = [
      { text: "Home", link: "/" },
      { text: "About", link: "/about" },
    ];

    const { container } = render(<HeaderTop breadcrumbs={breadcrumbs} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with maxWidth prop", () => {
    const maxWidth = "lg";
    const { container } = render(
      <HeaderTop
        maxWidth={maxWidth}
        breadcrumbs={[{ text: "Home", link: "/" }]}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
