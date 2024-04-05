export { MainRegister } from "./components/RegisterPage/MainRegister";
export { SelectedRegister } from "./components/RegisterPage/SelectedRegister";
export {
  useRegisterNamesQuery,
  fetchRegisterNames,
  useIndicatorQuery,
  useMedicalFieldsQuery,
} from "./helpers/hooks";
export { API_HOST } from "./components/RegisterPage";
export { Layout } from "./components/Layout";
export { level, levelSymbols } from "./helpers/functions";
export { FilterMenu } from "./components/FilterMenu";
export type {
  FilterMenuSelectionChangedHandler,
  FilterMenuFilterInitializedHandler,
} from "./components/FilterMenu";
export { FilterSettingsContext } from "./components/FilterMenu/FilterSettingsContext";
export type { FilterSettingsValue } from "./components/FilterMenu/FilterSettingsContext";
export {
  FilterSettingsDispatchContext,
  filterSettingsReducer,
  FilterSettingsActionType,
} from "./components/FilterMenu/FilterSettingsReducer";
export type { FilterSettingsAction } from "./components/FilterMenu/FilterSettingsReducer";
export { RadioGroupFilterSection } from "./components/FilterMenu/RadioGroupFilterSection";
export { SelectedFiltersSection } from "./components/FilterMenu/SelectedFiltersSection";
export { TreeViewFilterSection } from "./components/FilterMenu/TreeViewFilterSection";
export {
  TreatmentQualityFilterMenu,
  levelKey,
  treatmentUnitsKey,
  yearKey,
  medicalFieldKey,
} from "./components/FilterMenu/TreatmentQualityFilterMenu";
export type { TreatmentQualityFilterMenuProps } from "./components/FilterMenu/TreatmentQualityFilterMenu";
export { IndicatorTableBodyV2 } from "./components/IndicatorTable/IndicatortablebodyV2";
export { IndicatorTable } from "./components/IndicatorTable";
export { defaultYear } from "./app_config";

export { SelectTreatmentUnits } from "./components/SelectTreatmentUnits";
export { useUnitNamesQuery } from "./helpers/hooks";
export type { NestedTreatmentUnitName } from "./components/RegisterPage/unitnamelist/unitnamelistbody";
export { mainQueryParamsConfig } from "./app_config";
export { validateTreatmentUnits } from "./helpers/functions";
export { UnitNameList } from "./components/RegisterPage/unitnamelist";
