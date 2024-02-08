import { useIndicatorQuery } from "./helpers/hooks";

export { MainRegister } from "./components/RegisterPage/MainRegister";
export { SelectedRegister } from "./components/RegisterPage/SelectedRegister";
export {
  useRegisterNamesQuery,
  fetchRegisterNames,
  useIndicatorQuery,
} from "./helpers/hooks";
export { API_HOST } from "./components/RegisterPage";
export { Layout } from "./components/Layout";
export { level } from "./helpers/functions";
export { FilterMenu } from "./components/FilterMenu";
export {
  FilterSettingsContext,
  FilterSettingsDispatchContext,
  filterSettingsReducer,
  FilterSettingsActionType
} from "./components/FilterMenu/FilterSettingsContext";
