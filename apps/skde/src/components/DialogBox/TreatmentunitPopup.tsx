import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
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
import {
  borderRadius,
  columnColour1,
  columnColour2,
  columnColour3,
  marginTop,
  rippleOffset,
} from "./styles";

type TreatmentUnitPopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<string[]>>;
  context: string;
  type: string;
  selectionType?: "multiple" | "single";
};

export const TreatmentUnitPopup = (props: TreatmentUnitPopupProps) => {
  const {
    open,
    setOpen,
    onSubmit,
    context,
    type,
    selectionType = "multiple",
  } = props;
  const [highlightedRHF, setHighlightedRHF] = useState<string>("");
  const [highlightedHF, setHighlightedHF] = useState<string>("");

  const [unitSelection = ["Nasjonalt"], setUnitSelection] = useQueryParam(
    "units",
    mainQueryParamsConfig.units,
  );

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    context,
    type,
  );

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
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Add RHF to the selection
        if (event.target.checked) {
          // May contain duplicates
          const newRHFSelection = [...unitSelection, rhf.rhf];

          setUnitSelection([...new Set(newRHFSelection)]);
        } else {
          const newRHFSelection = [...unitSelection].filter((row) => {
            return row !== rhf.rhf;
          });
          setUnitSelection([...new Set(newRHFSelection)]);
        }
      };

      // Check if at least one subunit is checked.
      // The RHF checkbox should then be indeterminate.
      const hfChecked = () => {
        const selectedSet = new Set([...unitSelection]);
        const hfSet = new Set(rhf.hf.map((el) => el.hf));
        return selectedSet.intersection(hfSet).size > 0;
      };

      const hospitalsChecked = () => {
        const selectedSet = new Set([...unitSelection]);
        const hospitals = rhf.hf.flatMap((hf) => {
          return hf.hospital;
        });

        const hospitalSet = new Set([...hospitals]);
        return selectedSet.intersection(hospitalSet).size > 0;
      };

      return selectionType === "multiple" ? (
        <FormControlLabel
          value={rhf.rhf}
          label={rhf.rhf}
          key={rhf.rhf}
          onMouseEnter={() => {
            setHighlightedRHF(rhf.rhf);
            setHighlightedHF("");
          }}
          sx={{
            width: "100%",
            background:
              highlightedRHF === rhf.rhf ? columnColour2 : columnColour1,
          }}
          control={
            <Checkbox
              checked={unitSelection.includes(rhf.rhf)}
              indeterminate={
                !unitSelection.includes(rhf.rhf) &&
                (hfChecked() || hospitalsChecked())
              }
              onChange={handleChange}
              key={`${rhf.rhf}_checkbox`}
            />
          }
        />
      ) : (
        <FormControlLabel
          value={rhf.rhf}
          label={rhf.rhf}
          key={rhf.rhf}
          onMouseEnter={() => {
            setHighlightedRHF(rhf.rhf);
            setHighlightedHF("");
          }}
          sx={{
            width: "100%",
            background:
              highlightedRHF === rhf.rhf ? columnColour2 : columnColour1,
          }}
          control={<Radio />}
        />
      );
    }) as JSX.Element[]);

  // #################################################### //
  // Map HFs and hospitals and return checkbox components //
  // #################################################### //

  const HFCheckBoxes = {};
  const HospitalCheckBoxes = {};

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  unitNames &&
    // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
    unitNames.map((unitName: NestedTreatmentUnitName) => {
      const hfs = unitName.hf.sort((a, b) => {
        return a.hf_sort - b.hf_sort;
      });

      // ######################### //
      // ##### Map hospitals ##### ∕∕
      // ######################### //
      // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
      hfs.map((hf) => {
        const CheckBoxes = hf.hospital.map((hospital) => {
          const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
              const newUnitSelection = [...unitSelection, hospital];
              setUnitSelection([...newUnitSelection]);
            } else {
              const newUnitSelection = [
                ...unitSelection.filter((row) => {
                  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
                  return row != hospital;
                }),
              ];
              setUnitSelection(newUnitSelection);
            }
          };

          return selectionType === "multiple" ? (
            <FormControlLabel
              label={hospital}
              key={hospital}
              sx={{ width: "100%", background: columnColour3 }}
              control={
                <Checkbox
                  checked={unitSelection.includes(hospital)}
                  onChange={handleChange}
                  key={`${hospital}_checkbox`}
                />
              }
            />
          ) : (
            <FormControlLabel
              label={hospital}
              value={hospital}
              key={hospital}
              sx={{ width: "100%", background: columnColour3 }}
              control={<Radio />}
            />
          );
        });
        HospitalCheckBoxes[hf.hf] = CheckBoxes;
      });

      // ################### //
      // ##### Map HFs ##### ∕∕
      // ################### //
      const CheckBoxes = hfs.map((hf) => {
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.checked) {
            const newHFSelection = [...unitSelection, hf.hf];
            setUnitSelection([...newHFSelection]);
          } else {
            const newHFSelection = [
              ...unitSelection.filter((row) => {
                // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
                return row != hf.hf;
              }),
            ];
            setUnitSelection(newHFSelection);
          }
        };

        // Check if at least one hospital is checked.
        // The correspinding HF checkbox should then be indeterminate.
        const hospitalChecked = () => {
          const selectedSet = new Set([...unitSelection]);
          const hospitalSet = new Set([...hf.hospital]);
          return selectedSet.intersection(hospitalSet).size > 0;
        };

        return (
          <FormControlLabel
            label={hf.hf}
            key={hf.hf}
            value={hf.hf}
            onMouseEnter={() => {
              setHighlightedHF(hf.hf);
            }}
            sx={{
              width: "100%",
              background:
                highlightedHF === hf.hf ? columnColour3 : columnColour2,
            }}
            control={
              selectionType === "multiple" ? (
                <Checkbox
                  checked={unitSelection.includes(hf.hf)}
                  indeterminate={
                    !unitSelection.includes(hf.hf) && hospitalChecked()
                  }
                  onChange={handleChange}
                  key={`${hf.hf}_checkbox`}
                />
              ) : (
                <Radio />
              )
            }
          />
        );
      });
      HFCheckBoxes[unitName.rhf] = CheckBoxes;
    });

  const handleClose = () => {
    setOpen(false);
    setHighlightedRHF("");
  };

  const handleSubmit = () => {
    onSubmit(unitSelection.filter((unit): unit is string => unit !== null));
    setOpen(false);
    setHighlightedRHF("");
  };

  const handleSearch = (itemId: string[]) => {
    const newUnitSelection = [...unitSelection, ...itemId];
    setUnitSelection([...newUnitSelection]);
  };

  // might be another way
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUnitSelection([event.target.value]);
    // setRadioValue((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle>Velg behandlingssted</DialogTitle>
      <DialogContent
        sx={{ height: 600 }}
        onMouseLeave={() => {
          setHighlightedRHF("");
          setHighlightedHF("");
        }}
      >
        {unitNamesQuery.isFetching ? (
          LoadingComponent
        ) : (
          <div>
            <Box marginTop={2} marginBottom={2}>
              <TreeViewSearchBox
                options={Array.from(treatmentUnitsValueMap.values())}
                onSearch={handleSearch}
              />
            </Box>
            <Grid container height="100%">
              <Grid size={4}>
                <Box
                  sx={{
                    background: columnColour1,
                    height: "100%",
                    paddingLeft: `${rippleOffset}px`,
                    borderTopLeftRadius: borderRadius,
                    borderBottomLeftRadius: borderRadius,
                  }}
                >
                  {/* RHF Column */}
                  <FormControl sx={{ width: "100%", marginTop: marginTop }}>
                    {selectionType === "single" ? (
                      <RadioGroup
                        aria-labelledby={`RHF-label`}
                        aria-label="RHF"
                        name="row-radio-buttons-group"
                        value={unitSelection[0] || ""}
                        onChange={handleRadioChange}
                      >
                        {RHFCheckboxes?.map((row: JSX.Element) => row)}
                      </RadioGroup>
                    ) : (
                      RHFCheckboxes?.map((row: JSX.Element) => row)
                    )}
                  </FormControl>
                </Box>
              </Grid>
              <Grid size={4}>
                <Box
                  sx={{
                    background: highlightedRHF && columnColour2,
                    height: "100%",
                    marginLeft: `-${rippleOffset}px`,
                  }}
                >
                  {/* HF Column */}
                  <FormControl
                    sx={{
                      width: "100%",
                      marginLeft: `${rippleOffset}px`,
                      marginTop: marginTop,
                    }}
                  >
                    {selectionType === "multiple" ? (
                      HFCheckBoxes[highlightedRHF]?.map(
                        (row: JSX.Element) => row,
                      )
                    ) : (
                      <RadioGroup
                        aria-labelledby={`HF-label`}
                        aria-label="HF"
                        name="row-radio-buttons-group"
                        value={unitSelection[0] || ""}
                        onChange={handleRadioChange}
                      >
                        {HFCheckBoxes[highlightedRHF]?.map(
                          (row: JSX.Element) => row,
                        )}
                      </RadioGroup>
                    )}
                  </FormControl>
                </Box>
              </Grid>
              <Grid size={4}>
                <Box
                  sx={{
                    background: highlightedHF && columnColour3,
                    height: "100%",
                    borderTopRightRadius: borderRadius,
                    borderBottomRightRadius: borderRadius,
                  }}
                >
                  {/* Hospitals Column */}
                  <FormControl
                    sx={{
                      width: "100%",
                      marginLeft: `${rippleOffset}px`,
                      marginTop: marginTop,
                    }}
                  >
                    {selectionType === "single" ? (
                      <RadioGroup
                        aria-labelledby={`Hospital-label`}
                        aria-label="Hospital"
                        name="row-radio-buttons-group"
                        value={unitSelection[0] || ""}
                        onChange={handleRadioChange}
                      >
                        {HospitalCheckBoxes[highlightedHF]?.map(
                          (row: JSX.Element) => row,
                        )}
                      </RadioGroup>
                    ) : (
                      HospitalCheckBoxes[highlightedHF]?.map(
                        (row: JSX.Element) => row,
                      )
                    )}
                  </FormControl>
                </Box>
              </Grid>
            </Grid>
          </div>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Avbryt</Button>
        <Button
          onClick={handleSubmit}
        >{`${selectionType === "single" ? "OK" : `OK·(${unitSelection.length - 1})`}`}</Button>
      </DialogActions>
    </Dialog>
  );
};
