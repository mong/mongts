import { Button, Icon, IconButton } from "@mong/material-ui";
import {
  Box,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import type { UseQueryResult } from "@tanstack/react-query";
import {
  mainQueryParamsConfig,
  useMedicalFieldsQuery,
  useRegisterNamesQuery,
} from "qmongjs";
import { type Dispatch, type JSX, type SetStateAction, useState } from "react";
import type { Medfield, RegisterName } from "types";
import { useQueryParam } from "use-query-params";
import { getMedicalFields } from "../FilterMenu/TreatmentQualityFilterMenu/filterMenuOptions";
import { getFilterSettingsValuesMap } from "../FilterMenu/TreeViewFilterSection";
import TreeViewSearchBox from "../FilterMenu/TreeViewSearchBox";
import { LoadingComponent } from "../Placeholders/LoadingComponent/LoadingComponent";
import { columnColour1, columnColour2 } from "./styles";

type MedicalFieldPopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<string[]>>;
  updateRegistries: (newValue, updateType?) => void;
};

export const MedicalFieldPopup = (props: MedicalFieldPopupProps) => {
  const { open, setOpen, onSubmit, updateRegistries } = props;

  const [highlightedMedField, setHighlightedMedField] = useState<string>("");

  const [registrySelection = [], setRegistrySelection] = useQueryParam<
    string[] | undefined,
    string[]
    // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
  >("registries", mainQueryParamsConfig.registries);

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const medicalFieldsQuery: UseQueryResult<any, unknown> =
    useMedicalFieldsQuery();

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const registryQuery: UseQueryResult<any, unknown> = useRegisterNamesQuery();

  const dataIsFetching =
    medicalFieldsQuery.isFetching && registryQuery.isFetching;

  const medicalFieldsTree = getMedicalFields(
    medicalFieldsQuery?.data,
    registryQuery?.data,
    true,
  );

  const medicalFieldsValueMap = getFilterSettingsValuesMap(
    medicalFieldsTree.treedata,
  );

  // ################################################# //
  // Map medical fields and return checkbox components //
  // ################################################# //

  const MedfieldCheckboxes =
    medicalFieldsQuery.data &&
    (medicalFieldsQuery.data.map((medfield: Medfield) => {
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Add medfield to the selection
        if (event.target.checked) {
          // May contain duplicates

          const newRegistrySelection = [
            ...registrySelection,
            ...medfield.registers,
          ];

          setRegistrySelection([...new Set(newRegistrySelection)]);

          // Remove medfield from the selection
        } else {
          const newRegistrySelection = [...registrySelection].filter(
            (registry) => {
              return !medfield.registers.includes(registry);
            },
          );
          setRegistrySelection(newRegistrySelection);
        }
      };

      // Check if a registry is selected.
      // The corresponding medfield checkbox should then be indeterminate
      // if some if its registries are selected and checked if all are selected.
      const registryChecked = (registry: string) => {
        return registrySelection.includes(registry);
      };

      return (
        <FormControlLabel
          label={medfield.name}
          key={medfield.shortName}
          onClick={() => {
            setHighlightedMedField(medfield.name);
          }}
          sx={{
            width: "100%",
            margin: "0px",
            paddingLeft: "20px",
            paddingRight: "10px",
            background:
              highlightedMedField === medfield.name
                ? columnColour2
                : columnColour1,
            display: "flex",
            alignItems: "center",
            minWidth: 0,
            "& .MuiFormControlLabel-label": {
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              flex: 1,
              minWidth: 0,
            },
          }}
          control={
            <Checkbox
              checked={medfield.registers.every(registryChecked)}
              indeterminate={
                !medfield.registers.every(registryChecked) &&
                medfield.registers.some(registryChecked)
              }
              onChange={handleChange}
              key={medfield.name}
              sx={{
                color: "var(--brand-primary-400)",
                flexShrink: 0,
              }}
            />
          }
        />
      );
    }) as JSX.Element[]);

  // ############################################# //
  // Map registries and return checkbox components //
  // ############################################# //

  const RegistryCheckBoxes: Record<string, JSX.Element[]> = {};
  medicalFieldsQuery.data &&
    registryQuery.data &&
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    medicalFieldsQuery.data.map((medfield: Medfield) => {
      const CheckBoxes = medfield.registers.map((registry) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.checked) {
            const newSelection = [...registrySelection, registry];
            setRegistrySelection([...newSelection]);
          } else {
            const newSelection = [
              ...registrySelection.filter((row) => {
                return row !== registry;
              }),
            ];
            setRegistrySelection(newSelection);
          }
        };

        return (
          <FormControlLabel
            label={
              registryQuery.data.find((row: RegisterName) => {
                return row.rname === registry;
              }).short_name
            }
            key={registry}
            sx={{
              width: "100%",
              margin: "0px",
              paddingLeft: "20px",
              paddingRight: "10px",
              background: columnColour2,
              display: "flex",
              alignItems: "center",
              minWidth: 0,
              "& .MuiFormControlLabel-label": {
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
                minWidth: 0,
              },
            }}
            control={
              <Checkbox
                checked={registrySelection.includes(registry)}
                onChange={handleChange}
                key={`${registry}_checkbox`}
                sx={{
                  color: "var(--brand-primary-400)",
                  flexShrink: 0,
                }}
              />
            }
          />
        );
      });
      RegistryCheckBoxes[medfield.name] = CheckBoxes;
    });

  // ############## //
  // Event handlers //
  // ############## //

  const handleClose = () => {
    setOpen(false);
    setHighlightedMedField("");
  };

  const handleSubmit = () => {
    updateRegistries(registrySelection);
    onSubmit(registrySelection);
    setOpen(false);
    setHighlightedMedField("");
  };

  const handleSearch = (itemId: string[]) => {
    const newRegistrySelection = [...registrySelection, ...itemId];
    setRegistrySelection([...new Set(newRegistrySelection)]);
  };

  const handleClear = () => {
    setHighlightedMedField("");
    setRegistrySelection([]);
  };

  const selectedCount = registrySelection.length;

  const columnScrollClass =
    "min-h-0 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--brand-primary-300)_transparent] [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-primary-300 hover:[&::-webkit-scrollbar-thumb]:bg-brand-primary-400";

  // ################## //
  // ##### Return ##### //
  // ################## //

  return (
    <Dialog
      open={open}
      fullWidth
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            maxWidth: "120dvh",
            height: "100dvh",
            maxHeight: "80dvh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            paddingY: "var(--spacing-3)",
          },
        },
      }}
    >
      <div className="text-right pr-4 text-brand-primary-400 truncate">
        <IconButton onClick={handleClose} aria-label="Lukk popup">
          <Icon symbol="close" />
        </IconButton>
      </div>
      <div className="flex flex-1 min-h-0 w-full flex-col px-8 pt-0 pb-4">
        <div className="flex flex-row justify-between text-brand-primary-700">
          <h4>Velg fagområde</h4>
        </div>
        <DialogContent
          className="flex flex-col flex-1 min-h-0 px-0! pt-4!"
          sx={{ overflow: "hidden" }}
        >
          {dataIsFetching ? (
            LoadingComponent
          ) : (
            <div className="flex flex-1 min-h-0 flex-col">
              <Box marginTop={0} marginBottom={0} className="pb-6">
                <div className="text-sm font-semibold pb-2">Søk</div>
                <TreeViewSearchBox
                  options={Array.from(medicalFieldsValueMap.values())}
                  onSearch={handleSearch}
                  size="small"
                />
              </Box>
              <div className="flex flex-1 min-h-0">
                <div
                  className={`flex flex-col py-5 w-1/2 ${columnScrollClass} rounded-l-md text-brand-primary-700`}
                  style={{ background: columnColour1 }}
                >
                  <FormControl sx={{ width: "100%" }}>
                    {MedfieldCheckboxes?.map((row: JSX.Element) => row)}
                  </FormControl>
                </div>

                <div
                  className={`flex flex-col py-5 w-1/2 ${columnScrollClass} rounded-r-md text-dark`}
                  style={{ background: columnColour2 }}
                >
                  <h6
                    className={`${highlightedMedField ? "hidden" : "flex pt-3.25 px-5"} flex-1 grow text-center h-full flex-row font-regular`}
                  >
                    Velg et fagområde på venstre side
                  </h6>
                  <FormControl sx={{ width: "100%" }}>
                    {RegistryCheckBoxes[highlightedMedField]?.map(
                      (row: JSX.Element) => row,
                    )}
                  </FormControl>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions className="p-0! pt-2!">
          <Button variant="text" onClick={handleClear}>
            Tøm filter
          </Button>
          <Button
            onClick={handleSubmit}
          >{`Vis resultat (${selectedCount})`}</Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};
