import { vi, test, expect } from "vitest";
import { handleDelete } from "../SelectedFiltersSection";
import { FilterSettingsActionType } from "../FilterSettingsReducer";

const filterSettingsDispatch = vi.fn();

test("handleDelete calls filterSettingsDispatch with correct params", () => {
  handleDelete("key---value", filterSettingsDispatch);
  expect(filterSettingsDispatch).toHaveBeenCalledWith({
    type: FilterSettingsActionType.DEL_SECTION_SELECTIONS,
    sectionSetting: {
      key: "key",
      values: [{ value: "value", valueLabel: "" }],
    },
  });
});
