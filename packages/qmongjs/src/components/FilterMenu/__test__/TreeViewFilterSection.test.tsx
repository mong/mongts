import React from "react";
import { vi, describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import TreeViewFilterSection, {
  flattenTreeValues,
  getSelectedNodeIds,
  handleSelect,
  initDefaultExpanded,
  initFilterSettingsValuesMap,
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

  describe("handleSelect()", () => {
    const idToValueMap = initFilterSettingsValuesMap(treeData);

    it("should work with a string, non-array nodeId", () => {
      const mockDispatch = vi.fn();

      handleSelect("filterkey", "rootValue", idToValueMap, mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
        sectionSetting: {
          key: "filterkey",
          values: [treeData[0].nodeValue],
        },
      });
    });

    it("should work with array of nodeIds", () => {
      const mockDispatch = vi.fn();

      handleSelect("filterkey", "childValue-0-1", idToValueMap, mockDispatch);

      expect(mockDispatch).toHaveBeenCalledWith({
        type: FilterSettingsActionType.SET_SECTION_SELECTIONS,
        sectionSetting: {
          key: "filterkey",
          values: [
            {
              value: "childValue-0-1",
              valueLabel: "Child 0-1",
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
            treeData={treeData}
          />
        </FilterMenu>,
      );

      const treeViewComponent = result.getByTestId(
        "tree-view-section-testSection",
      );
      expect(treeViewComponent).toBeInTheDocument();
    });

    it("should select a node when clicked", async () => {
      const selectionHandlerMock = vi.fn();

      render(
        <FilterMenu onSelectionChanged={selectionHandlerMock}>
          <TreeViewFilterSection
            sectionid="testSection"
            sectiontitle="testTitle"
            filterkey="testKey"
            treeData={treeData}
            accordion="false"
          />
        </FilterMenu>,
      );

      const treeViewItem = await screen.getByTestId(
        "tree-view-section-item-rootValue",
      );

      await act(() => within(treeViewItem).getByText("Root Value").click());

      expect(selectionHandlerMock).toHaveBeenCalled();
      expect(treeViewItem.ariaSelected).toBe("true");
    });

    it("should expand tree to show initially selected nodes", () => {
      const result = render(
        <FilterMenu>
          <TreeViewFilterSection
            sectionid="testSection"
            sectiontitle="testTitle"
            filterkey="testKey"
            treeData={treeData}
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
        result.getByTestId("tree-view-section-item-childValue-0-1-0"),
      ).toBeVisible();
    });
  });
});
