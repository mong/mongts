import { defaultYear } from "qmongjs";
import { FilterSettingsValue } from "../components/FilterMenu/FilterSettingsContext";
import {
	dataQualityKey,
	levelKey,
	medicalFieldKey,
	tableContextKey,
	treatmentUnitsKey,
	yearKey,
} from "../components/FilterMenu/TreatmentQualityFilterMenu";
import getMedicalFieldFilterRegisters from "./getMedicalFieldFilterRegisters";

export const defaultTableContext = "caregiver";

export const valueOrDefault = (
	key: string,
	filterSettings: { map: Map<string, FilterSettingsValue[]> },
	// biome-ignore lint: no-explicit-any -- reason: global replace, please state reason here
	registers?: any,
	// biome-ignore lint: no-explicit-any -- reason: global replace, please state reason here
	medicalFields?: any,
) => {
	switch (key) {
		case tableContextKey: {
			return (
				filterSettings.map.get(tableContextKey)?.[0].value ??
				defaultTableContext
			);
		}
		case yearKey: {
			return filterSettings.map.get(yearKey)[0].value ?? defaultYear.toString();
		}
		case levelKey: {
			return filterSettings.map.get(levelKey)?.[0]?.value ?? undefined;
		}
		case medicalFieldKey: {
			const medicalFieldFilter = filterSettings.map
				.get(medicalFieldKey)
				?.map((value) => value.value);
			const registerFilter = getMedicalFieldFilterRegisters(
				medicalFieldFilter,
				registers,
				medicalFields,
			);
			return registerFilter;
		}
		case treatmentUnitsKey: {
			return filterSettings.map
				.get(treatmentUnitsKey)
				.map((value) => value.value);
		}
		case dataQualityKey: {
			return filterSettings.map.get(dataQualityKey)?.[0].value === "true"
				? true
				: false;
		}
		default:
			break;
	}
};
