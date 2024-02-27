import { vi, describe, it, expect } from "vitest";
import { fireEvent, render, within } from "@testing-library/react";
import SelectedFiltersSection, {
  handleDelete,
} from "../SelectedFiltersSection";
import { FilterSettingsActionType } from "../FilterSettingsReducer";
import FilterMenu, { FilterMenuSectionProps } from "..";
import { FilterSettingsValue } from "../FilterSettingsContext";

const filterSettingsDispatch = vi.fn();

describe("SelectedFiltersSection", () => {
  describe("handleDelete", () => {
    it("should corectly split the chipId into params passed to the dispatch function", () => {
      handleDelete("key---value", filterSettingsDispatch);
      expect(filterSettingsDispatch).toHaveBeenCalledWith({
        type: FilterSettingsActionType.DEL_SECTION_SELECTIONS,
        sectionSetting: {
          key: "key",
          values: [{ value: "value", valueLabel: "" }],
        },
      });
    });
  });

  describe("Rendered component", () => {
    const initialSelections = new Map<string, FilterSettingsValue[]>(
      Object.entries({
        testKey: [
          { value: "initialValue1", valueLabel: "Initial Selection 1" },
          { value: "initialValue2", valueLabel: "Initial Selection 2" },
        ],
      }),
    );

    const defaultValues = new Map<string, FilterSettingsValue[]>(
      Object.entries({
        testKey: [{ value: "defaultValue", valueLabel: "Default Selection" }],
      }),
    );

    const filterSettings: FilterMenuSectionProps = {
      sectionid: "testSection",
      sectiontitle: "testTitle",
      filterkey: "testKey",
    };

    it("should render a chip for each filter setting", () => {
      const result = render(
        <FilterMenu
          initialSelections={initialSelections}
          defaultValues={defaultValues}
        >
          <SelectedFiltersSection {...filterSettings} />
        </FilterMenu>,
      );

      const selectedFiltersComponent = result.getByTestId(
        "selected-filters-section-id-testSection",
      );
      expect(selectedFiltersComponent).toBeInTheDocument();
      expect(selectedFiltersComponent.children.length).toBe(2);

      const chipOneComponent = result.getByTestId("testKey---initialValue1");
      expect(chipOneComponent).toBeInTheDocument();
      expect(chipOneComponent).toHaveTextContent("Initial Selection 1");

      const chipTwoComponent = result.getByTestId("testKey---initialValue2");
      expect(chipTwoComponent).toBeInTheDocument();
      expect(chipTwoComponent).toHaveTextContent("Initial Selection 2");
    });

    it("should remove setting when the chip's cancel icon is clicked", () => {
      const result = render(
        <FilterMenu
          initialSelections={initialSelections}
          defaultValues={defaultValues}
        >
          <SelectedFiltersSection {...filterSettings} />
        </FilterMenu>,
      );

      const selectedFiltersComponent = result.getByTestId(
        "selected-filters-section-id-testSection",
      );
      expect(selectedFiltersComponent).toBeInTheDocument();
      expect(selectedFiltersComponent.children.length).toBe(2);

      const chipOneComponent = result.getByTestId("testKey---initialValue1");
      expect(chipOneComponent).toBeInTheDocument();
      expect(chipOneComponent).toHaveTextContent("Initial Selection 1");

      const cancelIcon = within(chipOneComponent).getByTestId("CancelIcon");
      fireEvent.click(cancelIcon);

      expect(chipOneComponent).not.toBeInTheDocument();
      expect(selectedFiltersComponent.children.length).toBe(1);
    });
  });
});
