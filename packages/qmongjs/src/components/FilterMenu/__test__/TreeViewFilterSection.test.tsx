import React from "react";
import { vi, describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import TreeViewFilterSection, {
  flattenTreeValues,
  getSelectedNodeIds,
  initDefaultExpanded,
  initFilterSettingsValuesMap,
  selectionHandlerFunc,
} from "../TreeViewFilterSection";
import { FilterSettingsActionType } from "../FilterSettingsReducer";
import FilterMenu from "..";
import { act } from "react-dom/test-utils";

describe("TreeViewFilterSection", () => {
  const treeData = [
    {
      nodeValue: {
        value: "rootValue",
        valueLabel: "Root Value",
      },
      children: [
        {
          nodeValue: {
            value: "childValue-0-0",
            valueLabel: "Child 0-0",
          },
          children: [],
        },
        {
          nodeValue: {
            value: "childValue-0-1",
            valueLabel: "Child 0-1",
          },
          children: [
            {
              nodeValue: {
                value: "childValue-0-1-0",
                valueLabel: "Child 0-1-0",
              },
            },
          ],
        },
      ],
    },
    {
      nodeValue: {
        value: "rootValue2",
        valueLabel: "Root Value 2",
      },
    },
  ];

  describe("flattenTreeValues()", () => {
    it("should return an array of all node values", () => {
      const result = flattenTreeValues([], treeData);
      expect(result).toEqual([
        { value: "rootValue", valueLabel: "Root Value", parentIds: [] },
        {
          value: "childValue-0-0",
          valueLabel: "Child 0-0",
          parentIds: ["rootValue"],
        },
        {
          value: "childValue-0-1",
          valueLabel: "Child 0-1",
          parentIds: ["rootValue"],
        },
        {
          value: "childValue-0-1-0",
          valueLabel: "Child 0-1-0",
          parentIds: ["rootValue", "childValue-0-1"],
        },
        { value: "rootValue2", valueLabel: "Root Value 2", parentIds: [] },
      ]);
    });
  });

  describe("initFilterSettingsValuesMap()", () => {
    it("should return a map with of all node values", () => {
      const result = initFilterSettingsValuesMap(treeData);

      expect(Array.from(result.entries())).toEqual([
        [
          "rootValue",
          { value: "rootValue", valueLabel: "Root Value", parentIds: [] },
        ],
        [
          "childValue-0-0",
          {
            value: "childValue-0-0",
            valueLabel: "Child 0-0",
            parentIds: ["rootValue"],
          },
        ],
        [
          "childValue-0-1",
          {
            value: "childValue-0-1",
            valueLabel: "Child 0-1",
            parentIds: ["rootValue"],
          },
        ],
        [
          "childValue-0-1-0",
          {
            value: "childValue-0-1-0",
            valueLabel: "Child 0-1-0",
            parentIds: ["rootValue", "childValue-0-1"],
          },
        ],
        [
          "rootValue2",
          { value: "rootValue2", valueLabel: "Root Value 2", parentIds: [] },
        ],
      ]);
    });
  });

  describe("initDefaultExpanded()", () => {
    it("should return an array of all parent values (deduped)", () => {
      const map = initFilterSettingsValuesMap(treeData);
      const result = initDefaultExpanded(
        ["childValue-0-1-0", "rootValue2", "childValue-0-0"],
        map,
      );

      expect(result).toEqual(["rootValue", "childValue-0-1"]);
    });
  });

  describe("getSelectedNodeIds()", () => {
    it("should return an array of values for an array of FilterSettingsValue", () => {
      const result = getSelectedNodeIds([
        { value: "value", valueLabel: "label" },
        { value: "value2", valueLabel: "label2" },
      ]);
      expect(result).toEqual(["value", "value2"]);
    });

    it("should return an empty array for undefined indput", () => {
      const result = getSelectedNodeIds(undefined);
      expect(result).toEqual([]);
    });
  });

  describe("selectionHandlerFunc()", () => {
    const idToValueMap = initFilterSettingsValuesMap(treeData);

    it("should call dispatcher with correct params when handler is called", () => {
      const mockDispatch = vi.fn();

      const handleCheckboxClick = selectionHandlerFunc(
        [],
        "filterkey",
        true,
        idToValueMap,
        mockDispatch,
      );

      handleCheckboxClick(true, "childValue-0-1-0");

      expect(mockDispatch).toHaveBeenCalledWith({
        type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
        sectionSetting: {
          key: "filterkey",
          values: [
            {
              value: "childValue-0-1-0",
              valueLabel: "Child 0-1-0",
            },
          ],
        },
      });
    });
  });

  describe("Rendered TreeViewFilterSection", () => {
    it("should render the tree data", () => {
      const result = render(
        <FilterMenu>
          <TreeViewFilterSection
            sectionid="testSection"
            sectiontitle="testTitle"
            filterkey="testKey"
            treedata={treeData}
          />
        </FilterMenu>,
      );

      const treeViewComponent = result.getByTestId(
        "tree-view-section-testSection",
      );
      expect(treeViewComponent).toBeInTheDocument();
    });

    it("should select the node when the checkbox is clicked", async () => {
      const selectionHandlerMock = vi.fn();

      render(
        <FilterMenu onSelectionChanged={selectionHandlerMock}>
          <TreeViewFilterSection
            sectionid="testSection"
            sectiontitle="testTitle"
            filterkey="testKey"
            treedata={treeData}
            accordion="false"
          />
        </FilterMenu>,
      );

      const treeViewCheckbox = await screen.getByTestId(
        "checkbox-testKey-rootValue",
      );

      const checkboxIconBlank = await within(treeViewCheckbox).getByTestId(
        "CheckBoxOutlineBlankIcon",
      );
      expect(checkboxIconBlank).toBeVisible();

      await act(() => treeViewCheckbox.click());

      expect(selectionHandlerMock).toHaveBeenCalled();

      const checkboxIcon =
        await within(treeViewCheckbox).getByTestId("CheckBoxIcon");
      expect(checkboxIcon).toBeVisible();
    });

    it("should expand tree to show initially selected nodes", () => {
      const result = render(
        <FilterMenu>
          <TreeViewFilterSection
            sectionid="testSection"
            sectiontitle="testTitle"
            filterkey="testKey"
            treedata={treeData}
            initialselections={[
              {
                value: "childValue-0-1-0",
                valueLabel: "Child 0-1-0",
              },
            ]}
            accordion="false"
          />
        </FilterMenu>,
      );

      expect(
        result.getByTestId("tree-view-item-childValue-0-1-0"),
      ).toBeVisible();
    });
  });
});
