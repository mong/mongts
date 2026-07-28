import { Box, Button, Icon, IconButton } from "@mong/material-ui";
import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import type { UseQueryResult } from "@tanstack/react-query";
import { mainQueryParamsConfig, useUnitNamesQuery } from "qmongjs";
import React, {
  type Dispatch,
  type JSX,
  type SetStateAction,
  useState,
} from "react";
import type { NestedTreatmentUnitName } from "types";
import { useQueryParam } from "use-query-params";
import { getTreatmentUnitsTree } from "../FilterMenu/TreatmentQualityFilterMenu/filterMenuOptions";
import { getFilterSettingsValuesMap } from "../FilterMenu/TreeViewFilterSection";
import TreeViewSearchBox from "../FilterMenu/TreeViewSearchBox";
import { LoadingComponent } from "../Placeholders/LoadingComponent/LoadingComponent";
import { columnColour1, columnColour2, columnColour3 } from "./styles";

type TreatmentUnitPopupSingleSelectProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<(string | null)[] | undefined>>;
  context: string;
  type: string;
};

export const TreatmentUnitPopupSingleSelect = (
  props: TreatmentUnitPopupSingleSelectProps,
) => {
  const { open, setOpen, onSubmit, context, type } = props;
  const [highlightedRHF, setHighlightedRHF] = useState<string>("");
  const [highlightedHF, setHighlightedHF] = useState<string>("");

  const [unitSelection = [], setUnitSelection] = useQueryParam(
    "selected_treatment_units",
    mainQueryParamsConfig.units,
  );

  const unitNamesQuery: UseQueryResult<
    { nestedUnitNames: NestedTreatmentUnitName[] },
    unknown
  > = useUnitNamesQuery("all", context, type);

  // Sort nested unit names by RHF
  const unitNames = unitNamesQuery.data?.nestedUnitNames.sort(
    (a: NestedTreatmentUnitName, b: NestedTreatmentUnitName) => {
      return a.rhf_sort - b.rhf_sort;
    },
  );

  const treatmentUnitsTree = getTreatmentUnitsTree(unitNamesQuery);
  const treatmentUnitsValueMap = getFilterSettingsValuesMap(
    treatmentUnitsTree.treedata,
  );

  // ####################################### //
  // Map RHFs and return checkbox components //
  // ####################################### //

  const RHFCheckboxes =
    unitNames &&
    (unitNames.map((rhf: NestedTreatmentUnitName) => {
      // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      //   // Add RHF to the selection
      //   if (event.target.checked) {
      //     // May contain duplicates
      //     const newRHFSelection = [...unitSelection, rhf.rhf];
      //
      //     setUnitSelection([...new Set(newRHFSelection)]);
      //   } else {
      //     const newRHFSelection = [...unitSelection].filter((row) => {
      //       return row !== rhf.rhf;
      //     });
      //     setUnitSelection([...new Set(newRHFSelection)]);
      //   }
      // };

      // // Check if at least one subunit is checked.
      // // The RHF checkbox should then be indeterminate.
      // const hfChecked = () => {
      //   const selectedSet = new Set([...unitSelection]);
      //   const hfSet = new Set(rhf.hf.map((el) => el.hf));
      //   return selectedSet.intersection(hfSet).size > 0;
      // };

      // const hospitalsChecked = () => {
      //   const selectedSet = new Set([...unitSelection]);
      //   const hospitals = rhf.hf.flatMap((hf) => {
      //     return hf.hospital;
      //   });
      //
      //   const hospitalSet = new Set([...hospitals]);
      //   return selectedSet.intersection(hospitalSet).size > 0;
      // };

      return (
        <FormControlLabel
          value={rhf.rhf}
          label={rhf.rhf}
          key={rhf.rhf}
          onClick={() => {
            setHighlightedRHF(rhf.rhf);
            setHighlightedHF("");
          }}
          sx={{
            width: "100%",
            margin: "0px",
            paddingLeft: "20px",
            background:
              highlightedRHF === rhf.rhf ? columnColour2 : columnColour1,
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
            <Radio
              sx={{
                color: "var(--brand-primary-400)",
                flexShrink: 0,
              }}
            />
          }
        />
      );
    }) as JSX.Element[]);

  // #################################################### //
  // Map HFs and hospitals and return checkbox components //
  // #################################################### //

  const HFCheckBoxes = {};
  const HospitalCheckBoxes = {};

  unitNames?.forEach((unitName: NestedTreatmentUnitName) => {
    const hfs = unitName.hf.sort((a, b) => {
      return a.hf_sort - b.hf_sort;
    });

    // ######################### //
    // ##### Map hospitals ##### ∕∕
    // ######################### //
    hfs.forEach((hf) => {
      const CheckBoxes = hf.hospital.map((hospital) => {
        return (
          <FormControlLabel
            label={hospital}
            value={hospital}
            key={hospital}
            sx={{
              width: "100%",
              margin: "0px",
              paddingLeft: "20px",
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
              <Radio
                sx={{
                  color: "var(--brand-primary-400)",
                  flexShrink: 0,
                }}
              />
            }
          />
        );
      });
      HospitalCheckBoxes[hf.hf] = CheckBoxes;
    });

    // ################### //
    // ##### Map HFs ##### ∕∕
    // ################### //
    const CheckBoxes = hfs.map((hf) => {
      return (
        <FormControlLabel
          label={hf.hf}
          key={hf.hf}
          value={hf.hf}
          onClick={() => {
            setHighlightedHF(hf.hf);
          }}
          sx={{
            width: "100%",
            margin: "0px",
            paddingLeft: "20px",
            background: highlightedHF === hf.hf ? columnColour3 : columnColour2,
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
            <Radio
              sx={{
                color: "var(--brand-primary-400)",
                flexShrink: 0,
              }}
            />
          }
        />
      );
    });
    HFCheckBoxes[unitName.rhf] = CheckBoxes;
  });

  const handleClose = () => {
    setOpen(false);
    setHighlightedRHF("");
    onSubmit([]);
  };

  const handleSubmit = () => {
    onSubmit(unitSelection.filter((unit): unit is string => unit !== null));
    setOpen(false);
    setHighlightedRHF("");
  };

  const handleSearch = (itemId: string[]) => {
    setUnitSelection([itemId[0]]);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnitSelection([event.target.value]);
  };

  const columnScrollClass =
    "min-h-0 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:var(--brand-primary-300)_transparent] [scrollbar-gutter:stable] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-brand-primary-300 hover:[&::-webkit-scrollbar-thumb]:bg-brand-primary-400";

  // Restore highlights when dialog opens with existing selection
  React.useEffect(() => {
    if (open && unitSelection[0]) {
      // Find which RHF and HF the selected unit belongs to
      let foundRHF = "";
      let foundHF = "";

      unitNames?.forEach((rhfItem: NestedTreatmentUnitName) => {
        // Check if selection is the RHF itself
        if (rhfItem.rhf === unitSelection[0]) {
          foundRHF = rhfItem.rhf;
          return;
        }

        // Check if selection is an HF
        rhfItem.hf.forEach((hfItem) => {
          if (hfItem.hf === unitSelection[0]) {
            foundRHF = rhfItem.rhf;
            foundHF = hfItem.hf;
            return;
          }

          // Check if selection is a hospital
          hfItem.hospital.forEach((hospital) => {
            if (hospital === unitSelection[0]) {
              foundRHF = rhfItem.rhf;
              foundHF = hfItem.hf;
            }
          });
        });
      });

      if (foundRHF) {
        setHighlightedRHF(foundRHF);
      }
      if (foundHF) {
        setHighlightedHF(foundHF);
      }
    }
  }, [open, unitSelection, unitNames]);

  return (
    <Dialog
      open={open}
      fullWidth
      scroll="paper"
      slotProps={{
        paper: {
          sx: {
            maxWidth: "80dvh", // Set your custom width here
            height: "50dvh", // Set fixed dialog height
            maxHeight: "80dvh", // Keep bounded to viewport
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          },
        },
      }}
    >
      <div className="text-right pt-4 pr-4 text-brand-primary-400 truncate">
        <IconButton onClick={handleClose} aria-label="Small Star">
          <Icon symbol="close" />
        </IconButton>
      </div>
      <div className="flex flex-1 min-h-0 w-full flex-col p-6 pt-0">
        <div className="flex flex-row justify-between text-brand-primary-700">
          <h4>Velg behandlingssted</h4>
        </div>
        <DialogContent
          className="flex flex-col flex-1 min-h-0 px-0!"
          sx={{
            overflow: "hidden",
          }}
        >
          {unitNamesQuery.isFetching ? (
            LoadingComponent
          ) : (
            <div className="flex flex-1 min-h-0 flex-col">
              <Box padded={false} color="transparent" className="pb-6">
                <div className="text-sm font-semibold pb-2">Søk</div>
                <TreeViewSearchBox
                  size="small"
                  options={Array.from(treatmentUnitsValueMap.values())}
                  onSearch={handleSearch}
                />
              </Box>
              <div className="flex flex-1 min-h-0">
                {/* Column 1: RHF */}
                <div
                  className={`flex ${columnScrollClass} ${highlightedHF ? "w-1/3" : "w-1/2"} bg-brand-primary-50 text-brand-primary-700 py-5 transition-all`}
                >
                  {/* RHF Column */}
                  <FormControl sx={{ width: "100%" }}>
                    <RadioGroup
                      aria-labelledby={`RHF-label`}
                      aria-label="RHF"
                      name="row-radio-buttons-group"
                      value={unitSelection[0] || ""}
                      onChange={handleRadioChange}
                    >
                      {RHFCheckboxes?.map((row: JSX.Element) => row)}
                    </RadioGroup>
                  </FormControl>
                </div>

                {/* Column 2: HF */}
                <div
                  className={`flex flex-1 ${columnScrollClass} bg-brand-primary-200 text-dark pt-5 ${highlightedHF ? "w-1/3" : "w-1/2"} transition-all`}
                >
                  <h6
                    className={`${highlightedRHF || highlightedHF ? "hidden" : "flex pt-3.25 pl-5"} flex-1 grow text-center h-full flex-row font-regular`}
                  >
                    Velg et behandlingssted på venstre side
                  </h6>

                  <FormControl sx={{ width: "100%" }}>
                    <RadioGroup
                      aria-labelledby={`HF-label`}
                      aria-label="HF"
                      name="row-radio-buttons-group"
                      value={unitSelection[0] || ""}
                      onChange={handleRadioChange}
                      sx={{ width: "100%" }}
                    >
                      {HFCheckBoxes[highlightedRHF]?.map(
                        (row: JSX.Element) => row,
                      )}
                    </RadioGroup>
                  </FormControl>
                </div>

                {/* Column 3: Hospital */}
                {highlightedHF && (
                  <div
                    className={`flex flex-1 ${columnScrollClass} bg-brand-primary-50 text-dark py-5 ${highlightedHF ? "w-1/3" : "w-1/2"} transition-all`}
                  >
                    {/* Hospitals Column */}
                    <FormControl
                      sx={{
                        width: "100%",
                      }}
                    >
                      <RadioGroup
                        aria-labelledby={`Hospital-label`}
                        aria-label="Hospital"
                        name="row-radio-buttons-group"
                        value={unitSelection[0] || ""}
                        onChange={handleRadioChange}
                        sx={{
                          width: "100%",
                          backgroundColor: columnColour3,
                          borderTopRightRadius: "var(--radius-8)",
                          borderBottomRightRadius: "var(--radius-8)",
                        }}
                      >
                        {HospitalCheckBoxes[highlightedHF]?.map(
                          (row: JSX.Element) => row,
                        )}
                      </RadioGroup>
                    </FormControl>
                  </div>
                )}
              </div>
            </div>
          )}
        </DialogContent>
        <DialogActions className="p-0!">
          <Button
            variant="text"
            onClick={() => {
              setHighlightedRHF("");
              setHighlightedHF("");
              setUnitSelection([""]);
            }}
          >
            Tøm filter
          </Button>
          <Button onClick={handleSubmit} disabled={unitSelection.length === 0}>
            Vis resultat
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
};
