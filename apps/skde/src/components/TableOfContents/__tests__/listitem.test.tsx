import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { ListItem } from "../ListItem";
import { vi, describe, it, expect } from "vitest";
import "@testing-library/jest-dom";

describe("ListItem component", () => {
  it("renders list item with valid props", () => {
    const props = {
      href: "#test",
      linkTitle: "Test Link",
      expanded: "",
      setExpanded: vi.fn(),
    };
    const { getByTestId } = render(<ListItem {...props} />);
    expect(getByTestId("tocItem")).toBeInTheDocument();
    expect(getByTestId("toc_a_#test")).toHaveAttribute("href", "#test");
  });

  it("renders list item with children", () => {
    const props = {
      href: "#test",
      linkTitle: "Test Link",
      expanded: "all",
      setExpanded: vi.fn(),
      children: <div>Test Children</div>,
    };
    const { getByTestId, getByText } = render(<ListItem {...props} />);
    expect(getByTestId("tocItem")).toBeInTheDocument();
    expect(getByTestId("toc_a_#test")).toHaveAttribute("href", "#test");
    expect(getByText("Test Children")).toBeInTheDocument();
  });

  it("renders list item with expanded state", () => {
    const props = {
      href: "#test",
      linkTitle: "Test Link",
      expanded: "#test",
      setExpanded: vi.fn(),
    };
    const { container } = render(<ListItem {...props} />);
    expect(container).toMatchSnapshot();
  });

  it("click on link toggles expanded state", () => {
    const props = {
      href: "#test",
      linkTitle: "Test Link",
      expanded: "",
      setExpanded: vi.fn(),
    };
    const { getByTestId } = render(<ListItem {...props} />);
    const link = getByTestId(`toc_a_#test`);
    fireEvent.click(link);
    expect(props.setExpanded).toHaveBeenCalledTimes(1);
  });

  it('click on link with expanded state set to "all" does not toggle expanded state', () => {
    const props = {
      href: "#test",
      linkTitle: "Test Link",
      expanded: "all",
      setExpanded: vi.fn(),
    };
    const { getByTestId } = render(<ListItem {...props} />);
    const link = getByTestId(`toc_a_#test`);
    expect(props.setExpanded).not.toHaveBeenCalled();
    fireEvent.click(link);
    expect(props.setExpanded).toHaveBeenCalled();
  });
});
