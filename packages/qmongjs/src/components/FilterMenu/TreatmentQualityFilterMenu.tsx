import React from "react";
import FilterMenu, { FilterMenuSelectionChangedHandler } from ".";
import SelectedFiltersSection from "./SelectedFiltersSection";
import { FilterSettingsValue } from "./FilterSettingsContext";
import RadioGroupFilterSection from "./RadioGroupFilterSection";
import TreeViewFilterSection, {
  TreeViewFilterSectionNode,
} from "./TreeViewFilterSection";

/**
 * The options for the radio group filter sections.
 */
export type TreatmentQualityRadioGroupOptions = {
  default: FilterSettingsValue;
  options: FilterSettingsValue[];
};

/**
 * The options for the tree view components.
 */
export type TreatmentQualityTreeViewOptions = {
  defaults: FilterSettingsValue[];
  treedata: TreeViewFilterSectionNode[];
};

/**
 * The properties accepted by the TreatmentQualityFilterMenu component.
 */
export type TreatmentQualityFilterMenuProps = {
  medicalfields: TreatmentQualityRadioGroupOptions;
  goalaccomplishments?: TreatmentQualityRadioGroupOptions;
  treatmentunitstree: TreatmentQualityTreeViewOptions;
  years?: TreatmentQualityRadioGroupOptions;
  maxtreatmentunits?: number;
  onSelectionChanged?: FilterMenuSelectionChangedHandler;
};

/**
 * Returns the standard goal accomplishment options and default value if the input
 * value is undefined.
 *
 * @param goalAccomplishments The goal accomplishments filter settings
 */
export const getStandardGoalAccomplishment = (
  goalAccomplishments?: TreatmentQualityRadioGroupOptions,
) => {
  return (
    goalAccomplishments ?? {
      default: { value: "all", valueLabel: "Alle måloppnåelser" },
      options: [
        { value: "all", valueLabel: "Alle måloppnåelser" },
        { value: "H", valueLabel: "Høy måloppnåelse" },
        { value: "M", valueLabel: "Moderat måloppnåelse" },
        { value: "L", valueLabel: "Lav måloppnåelse" },
      ],
    }
  );
};

export const getYearOptions = () => {
  return {
    default: { value: "2023", valueLabel: "2023" },
    options: [
      { value: "2021", valueLabel: "2021" },
      { value: "2022", valueLabel: "2022" },
      { value: "2023", valueLabel: "2023" },
      { value: "2024", valueLabel: "2024" },
    ],
  };
};

/**
 * Filter menu for treatment quality page.
 */
export function TreatmentQualityFilterMenu(
  props: TreatmentQualityFilterMenuProps,
) {
  const medicalFieldOptions = props.medicalfields.options;
  const medicalFieldDefault = props.medicalfields.default;
  const goalAccomplishments = getStandardGoalAccomplishment(
    props.goalaccomplishments,
  );
  const goalAccomplishmentOptions = goalAccomplishments.options;
  const goalAccomplishmentDefault = goalAccomplishments.default;
  const treatmentUnitsTree = props.treatmentunitstree;
  const maxSelections = props.maxtreatmentunits;
  const yearOptions = props.years ?? getYearOptions();

  return (
    <FilterMenu onSelectionChanged={props.onSelectionChanged}>
      <SelectedFiltersSection
        sectionid="treatment-quality-selected-filters-chips"
        sectiontitle={"Valgte filtre"}
        filterkey={"selected-filter-chips"}
        accordion="false"
      />
      <RadioGroupFilterSection
        radios={yearOptions.options}
        defaultvalues={[yearOptions.default]}
        sectiontitle={"År"}
        sectionid={"year"}
        filterkey={"year"}
      />
      <RadioGroupFilterSection
        radios={goalAccomplishmentOptions}
        defaultvalues={[goalAccomplishmentDefault]}
        sectiontitle={"Måloppnåelse"}
        sectionid={"goal-accomplishment"}
        filterkey={"level"}
      />
      <RadioGroupFilterSection
        radios={medicalFieldOptions}
        defaultvalues={[medicalFieldDefault]}
        sectiontitle={"Fagområder"}
        sectionid={"medical-field"}
        filterkey={"indicator"}
      />
      <TreeViewFilterSection
        sectionid="treatment-units"
        sectiontitle="Behandlingsenheter"
        filterkey="unit_name"
        maxselections={maxSelections}
        treedata={treatmentUnitsTree.treedata}
        defaultvalues={treatmentUnitsTree.defaults}
      />
    </FilterMenu>
  );
}

export default TreatmentQualityFilterMenu;
