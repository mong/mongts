import { FilterDrawer } from "../TreatmentQuality";
import { TreatmentQualityFilterMenu } from "qmongjs";
import {
  FilterSettingsValue,
  FilterSettingsAction,
  decodeRegisterQueryParam,
  defaultYear,
  treatmentUnitsKey,
  yearKey,
  medicalFieldKey,
  FilterSettingsActionType,
  tableContextKey,
} from "qmongjs";
import { Box, Typography, Divider, IconButton } from "@mui/material";
import { ChevronLeftRounded } from "@mui/icons-material";
import { RegisterName, Medfield } from "types";
import { defaultTableContext } from "../../../pages/behandlingskvalitet/utils/valueOrDefault";

type HeatMapFilterMenuProps = {
  registryNameData: RegisterName[];
  medicalFieldData: Medfield[];
  page: string;
  drawerOpen: boolean;
  toggleDrawer: (newOpen: boolean) => void;
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>;
  setSelectedMedicalFields: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedTreatmentUnits: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedTableContext: React.Dispatch<React.SetStateAction<string>>;
};

export const HeatMapFilterMenu = (props: HeatMapFilterMenuProps) => {
  const {
    toggleDrawer,
    drawerOpen,
    registryNameData,
    medicalFieldData,
    page,
    setSelectedYear,
    setSelectedMedicalFields,
    setSelectedTreatmentUnits,
    setSelectedTableContext,
  } = props;

  // ######################################## //
  // ##### Copy-paste filter meny stuff ##### //
  // ######################################## //

  /**
   * Get the register names for the selected medical fields and registers
   *
   * @param medicalFieldFilter Array of medical field and register names
   * @returns Array of register names
   */
  const getMedicalFieldFilterRegisters = (medicalFieldFilter: string[]) => {
    let registerFilter: string[];

    if (!medicalFieldFilter || medicalFieldFilter[0] === "all") {
      registerFilter = registryNameData.map((register) => register.rname);
    } else {
      const selectedMedicalFields = medicalFieldData.filter((field) =>
        medicalFieldFilter.includes(field.shortName),
      );
      const selectedMedicalFieldNames = selectedMedicalFields.map(
        (field) => field.shortName,
      );
      const selectedRegisters = medicalFieldFilter.filter(
        (name) => !selectedMedicalFieldNames.includes(name),
      );
      registerFilter = Array.from(
        new Set<string>([
          ...selectedMedicalFields.flatMap((field) => field.registers),
          ...selectedRegisters.map((register) =>
            decodeRegisterQueryParam(register),
          ),
        ]),
      );
    }

    return registerFilter;
  };

  /**
   * Handle that the initial filter settings are loaded, which can happen
   * more than once due to Next's pre-rendering and hydration behaviour combined
   * with reading of query params.
   *
   * @param filterSettings Initial values for the filter settings
   */
  const handleFilterInitialized = (
    filterSettings: Map<string, FilterSettingsValue[]>,
  ): void => {
    setSelectedTableContext(
      filterSettings.get(tableContextKey)?.[0].value ?? defaultTableContext,
    );
    setSelectedYear(
      parseInt(filterSettings.get(yearKey)[0].value ?? defaultYear.toString()),
    );

    const medicalFieldFilter = filterSettings
      .get(medicalFieldKey)
      ?.map((value) => value.value);

    const registerFilter = getMedicalFieldFilterRegisters(medicalFieldFilter);
    setSelectedMedicalFields(registerFilter);

    setSelectedTreatmentUnits(
      filterSettings.get(treatmentUnitsKey).map((value) => value.value),
    );
  };

  const valueOrDefault = (
    key: string,
    filterSettings: { map: Map<string, FilterSettingsValue[]> },
  ) => {
    switch (key) {
      case yearKey: {
        return (
          filterSettings.map.get(yearKey)[0].value ?? defaultYear.toString()
        );
      }
      case medicalFieldKey: {
        const medicalFieldFilter = filterSettings.map
          .get(medicalFieldKey)
          ?.map((value) => value.value);
        const registerFilter =
          getMedicalFieldFilterRegisters(medicalFieldFilter);
        return registerFilter;
      }
      case treatmentUnitsKey: {
        return filterSettings.map
          .get(treatmentUnitsKey)
          .map((value) => value.value);
      }
      default:
        break;
    }
  };

  const setAllSelected = (newFilterSettings: {
    map: Map<string, FilterSettingsValue[]>;
  }) => {
    setSelectedYear(
      parseInt(valueOrDefault(yearKey, newFilterSettings) as string),
    );
    setSelectedMedicalFields(
      valueOrDefault(medicalFieldKey, newFilterSettings) as string[],
    );
    setSelectedTreatmentUnits(
      valueOrDefault(treatmentUnitsKey, newFilterSettings) as string[],
    );
  };

  /**
   * Handle filter changes
   */
  const handleFilterChanged = (
    newFilterSettings: { map: Map<string, FilterSettingsValue[]> },
    oldFilterSettings: { map: Map<string, FilterSettingsValue[]> },
    action: FilterSettingsAction,
  ): void => {
    switch (action.sectionSetting.key) {
      case tableContextKey: {
        setSelectedTableContext(
          valueOrDefault(tableContextKey, newFilterSettings) as string,
        );
        break;
      }
      case yearKey: {
        setSelectedYear(
          parseInt(valueOrDefault(yearKey, newFilterSettings) as string),
        );
        break;
      }
      case medicalFieldKey: {
        setSelectedMedicalFields(
          valueOrDefault(medicalFieldKey, newFilterSettings) as string[],
        );
        break;
      }
      case treatmentUnitsKey: {
        setSelectedTreatmentUnits(
          valueOrDefault(treatmentUnitsKey, newFilterSettings) as string[],
        );
        break;
      }
      default:
        break;
    }

    if (action.type === FilterSettingsActionType.RESET_SELECTIONS) {
      setAllSelected(newFilterSettings);
    }
  };

  return (
    <FilterDrawer
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      open={drawerOpen}
      onClose={() => toggleDrawer(false)}
    >
      <Box sx={{ display: "flex", m: 2, justifyContent: "space-between" }}>
        <Typography variant="h3">Filtermeny</Typography>
        <IconButton
          aria-label="Lukk sidemeny"
          onClick={() => toggleDrawer(false)}
        >
          <ChevronLeftRounded fontSize="large" />
        </IconButton>
      </Box>
      <Divider />
      <TreatmentQualityFilterMenu
        onSelectionChanged={handleFilterChanged}
        onFilterInitialized={handleFilterInitialized}
        registryNameData={registryNameData}
        medicalFieldData={medicalFieldData}
        page={page}
      />
    </FilterDrawer>
  );
};
