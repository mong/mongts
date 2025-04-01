import React from "react";
import { screen, render, fireEvent } from "@testing-library/react";
import { ChipSelection } from "../.";
import { vi, describe, test, expect } from "vitest";

vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({
    style: {
      fontFamily: "mocked",
    },
  }),
}));

describe("ChipSelection", () => {
  test("renders with correct labels and help text", () => {
    const { getByText, getByRole, container } = render(
      <ChipSelection
        leftChipLabel="Chip 1"
        rightChipLabel="Chip 2"
        leftChipHelpText="Help text for Chip 1"
        rightChipHelpText="Help text for Chip 2"
        state={false}
        stateSetter={() => {}}
        trueChip="left"
        hoverBoxOffset={[0, 0]}
        hoverBoxPlacement="top"
        hoverBoxMaxWidth={100}
      />,
    );

    expect(getByText("Chip 1")).toBeTruthy();
    expect(getByText("Chip 2")).toBeTruthy();
    const button1 = getByRole("button", { name: "Help text for Chip 1" });
    expect(button1).toBeTruthy();
    const button2 = getByRole("button", { name: "Help text for Chip 2" });
    expect(button2).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test("toggles state when a chip is clicked", () => {
    const setState = vi.fn();
    render(
      <ChipSelection
        leftChipLabel="Chip 1"
        rightChipLabel="Chip 2"
        leftChipHelpText="Help text for Chip 1"
        rightChipHelpText="Help text for Chip 2"
        state={false}
        stateSetter={setState}
        trueChip="left"
        hoverBoxOffset={[0, 0]}
        hoverBoxPlacement="top"
        hoverBoxMaxWidth={100}
      />,
    );

    fireEvent.click(screen.getByText("Chip 1"));
    expect(setState).toHaveBeenCalledWith(true);

    fireEvent.click(screen.getByText("Chip 2"));
    expect(setState).toHaveBeenCalledWith(false);
  });
  test("renders with trueChip right", () => {
    const { container } = render(
      <ChipSelection
        leftChipLabel="Chip 1"
        rightChipLabel="Chip 2"
        leftChipHelpText="Help text for Chip 1"
        rightChipHelpText="Help text for Chip 2"
        state={false}
        stateSetter={() => {}}
        trueChip="right"
        hoverBoxOffset={[0, 0]}
        hoverBoxPlacement="top"
        hoverBoxMaxWidth={100}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
