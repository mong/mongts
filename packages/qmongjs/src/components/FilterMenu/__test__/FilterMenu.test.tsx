import React from "react";
import { describe, it, expect } from "vitest";
import { createInitialFilterSettings, FilterMenuSectionProps } from "..";
import { FilterSettingsValue } from "../FilterSettingsContext";

const SectionTestComponent = (/*props: FilterMenuSectionProps*/) => {
  return <></>;
};

describe("FilterMenu", () => {
  describe("initalState()", () => {
    it("should add the input defaults to returned defaults", () => {
      const defaults = new Map<string, FilterSettingsValue[]>();
      defaults.set("testkey", [
        { value: "testValue", valueLabel: "testLabel" },
      ]);
      const result = createInitialFilterSettings(new Map(), defaults, []);
      expect(result.defaults).toEqual(defaults);
    });

    it("should add the input initial value map to returned initial map", () => {
      const initialSelections = new Map<string, FilterSettingsValue[]>();
      initialSelections.set("testkey", [
        { value: "testValue", valueLabel: "testLabel" },
      ]);
      const result = createInitialFilterSettings(
        initialSelections,
        new Map(),
        [],
      );
      expect(result.map).toEqual(initialSelections);
    });

    it("should add input default values to the returned initial map when not already set", () => {
      const defaults = new Map<string, FilterSettingsValue[]>();
      defaults.set("testkey", [
        { value: "testValue", valueLabel: "testLabel" },
      ]);
      const result = createInitialFilterSettings(new Map(), defaults, []);
      expect(result.map).toEqual(defaults);
    });

    it("should not add initial values to the returned defaults", () => {
      const initialSelections = new Map<string, FilterSettingsValue[]>();
      initialSelections.set("testkey", [
        { value: "testValue", valueLabel: "testLabel" },
      ]);
      const result = createInitialFilterSettings(
        initialSelections,
        new Map(),
        [],
      );
      expect(result.defaults).toEqual(new Map());
    });

    it("should only add input default values to the returned initial if not already set", () => {
      const defaults = new Map<string, FilterSettingsValue[]>();
      const keyDefault = "testkeyDefault";
      const keyInit = "testkeyInit";
      defaults.set(keyDefault, [
        { value: "defaultValue", valueLabel: "defaultLabel" },
      ]);
      defaults.set(keyInit, [
        {
          value: "defaultValueNotInit",
          valueLabel: "labelDefaultValueNotInit",
        },
      ]);
      const initialSelections = new Map<string, FilterSettingsValue[]>();
      initialSelections.set(keyInit, [
        { value: "initValue", valueLabel: "initLabel" },
      ]);
      const result = createInitialFilterSettings(
        initialSelections,
        defaults,
        [],
      );
      expect(result.map.get(keyInit)).toEqual(initialSelections.get(keyInit));
      expect(result.map.get(keyDefault)).toEqual(defaults.get(keyDefault));
    });

    it("should add default values from sections to the returned initial map and defaults", () => {
      const sectionProps: FilterMenuSectionProps[] = [
        {
          sectionid: "section1",
          sectiontitle: "Section 1",
          filterkey: "key1",
          defaultvalues: [{ value: "value1", valueLabel: "label1" }],
        },
        {
          sectionid: "section2",
          sectiontitle: "Section 2",
          filterkey: "key2",
          defaultvalues: [{ value: "value2", valueLabel: "label2" }],
        },
      ];

      const sections = [
        <SectionTestComponent key="1" {...sectionProps[0]} />,
        <SectionTestComponent key="2" {...sectionProps[1]} />,
      ];

      const result = createInitialFilterSettings(
        new Map(),
        new Map(),
        sections,
      );

      expect(result.map.get(sectionProps[0].filterkey)).toEqual(
        sectionProps[0].defaultvalues,
      );
      expect(result.defaults.get(sectionProps[0].filterkey)).toEqual(
        sectionProps[0].defaultvalues,
      );

      expect(result.map.get(sectionProps[1].filterkey)).toEqual(
        sectionProps[1].defaultvalues,
      );
      expect(result.map.get(sectionProps[1].filterkey)).toEqual(
        sectionProps[1].defaultvalues,
      );
    });

    it("should overwrite default values set for FilterMenu component with default values set for child component", () => {
      const defaults = new Map<string, FilterSettingsValue[]>();
      defaults.set("key", [
        { value: "topDefaultValue", valueLabel: "topDefaultLabel" },
      ]);

      const sectionProps: FilterMenuSectionProps = {
        sectionid: "section1",
        sectiontitle: "Section 1",
        filterkey: "key",
        defaultvalues: [
          { value: "sectionDefaultValue", valueLabel: "sectionDefaultLabel" },
        ],
      };

      const sections = [<SectionTestComponent key="1" {...sectionProps} />];

      const result = createInitialFilterSettings(new Map(), defaults, sections);

      expect(result.map.get("key")).toEqual(sectionProps.defaultvalues);
      expect(result.defaults.get("key")).toEqual(sectionProps.defaultvalues);
    });
  });
});
