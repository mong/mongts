import React from "react";
import { render } from "@testing-library/react";
import { HeaderTop } from "../HeaderTop";
import { BreadCrumbPath } from "../HeaderTop";
import { describe, it, expect } from "vitest";

describe("HeaderTop component", () => {
  it("renders with breadcrumbs", () => {
    const breadcrumbs: BreadCrumbPath = {
      path: [
        { text: "Home", link: "/" },
        { text: "About", link: "/about" },
      ],
    };
    const { container } = render(<HeaderTop breadcrumbs={breadcrumbs} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with maxWidth prop", () => {
    const maxWidth = "lg";
    const { container } = render(
      <HeaderTop
        maxWidth={maxWidth}
        breadcrumbs={{ path: [{ text: "Home", link: "/" }] }}
      />,
    );
    expect(container).toMatchSnapshot();
  });
});
