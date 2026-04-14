import { JSX } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  FormControl,
  Grid,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { useUnitNamesQuery } from "qmongjs";
import { NestedTreatmentUnitName } from "types";
import {
  columnColour1,
  columnColour2,
  columnColour3,
  rippleOffset,
  borderRadius,
  marginTop,
} from "./styles";

type TreatmentUnitPopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<string[]>>;
  context: string;
  type: string;
};

export const TreatmentUnitPopup = (props: TreatmentUnitPopupProps) => {
  const { open, setOpen, onSubmit, context, type } = props;

  const [unitSelection, setUnitSelection] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [highlightedRHF, setHighlightedRHF] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [highlightedHF, setHighlightedHF] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    context,
    type,
  );

  // Sort nested unit names by RHF
  const unitNames =
    unitNamesQuery.data &&
    unitNamesQuery.data.nestedUnitNames.sort(
      (a: NestedTreatmentUnitName, b: NestedTreatmentUnitName) => {
        return a.rhf_sort - b.rhf_sort;
      },
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
        const hospitals = rhf.hf
          .map((hf) => {
            return hf.hospital;
          })
          .flat();

        const hospitalSet = new Set([...hospitals]);
        return selectedSet.intersection(hospitalSet).size > 0;
      };

      return (
        <FormControlLabel
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
              key={rhf.rhf + "_checkbox"}
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

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  unitNames &&
    unitNames.map((unitName: NestedTreatmentUnitName) => {
      const hfs = unitName.hf.sort((a, b) => {
        return a.hf_sort - b.hf_sort;
      });

      // ######################### //
      // ##### Map hospitals ##### ∕∕
      // ######################### //
      hfs.map((hf) => {
        const CheckBoxes = hf.hospital.map((hospital) => {
          const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            if (event.target.checked) {
              const newUnitSelection = [...unitSelection, hospital];
              setUnitSelection([...newUnitSelection]);
            } else {
              const newUnitSelection = [
                ...unitSelection.filter((row) => {
                  return row != hospital;
                }),
              ];
              setUnitSelection(newUnitSelection);
            }
          };
          return (
            <FormControlLabel
              label={hospital}
              key={hospital}
              sx={{ width: "100%", background: columnColour3 }}
              control={
                <Checkbox
                  checked={unitSelection.includes(hospital)}
                  onChange={handleChange}
                  key={hospital + "_checkbox"}
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
        const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          if (event.target.checked) {
            const newHFSelection = [...unitSelection, hf.hf];
            setUnitSelection([...newHFSelection]);
          } else {
            const newHFSelection = [
              ...unitSelection.filter((row) => {
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
            onMouseEnter={() => {
              setHighlightedHF(hf.hf);
            }}
            sx={{
              width: "100%",
              background:
                highlightedHF === hf.hf ? columnColour3 : columnColour2,
            }}
            control={
              <Checkbox
                checked={unitSelection.includes(hf.hf)}
                indeterminate={
                  !unitSelection.includes(hf.hf) && hospitalChecked()
                }
                onChange={handleChange}
                key={hf.hf + "_checkbox"}
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
  };

  const handleSubmit = () => {
    onSubmit(["Nasjonalt", ...unitSelection]);
    setOpen(false);
    setHighlightedRHF("");
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle>Velg behandlingsenheter</DialogTitle>
      <DialogContent
        sx={{ height: 600 }}
        onMouseLeave={() => {
          setHighlightedRHF("");
          setHighlightedHF("");
        }}
      >
        <Grid container height="100%">
          <Grid size={4}>
            <Box
              sx={{
                background: columnColour1,
                height: "100%",
                paddingLeft: rippleOffset + "px",
                borderTopLeftRadius: borderRadius,
                borderBottomLeftRadius: borderRadius,
              }}
            >
              <FormControl sx={{ width: "100%", marginTop: marginTop }}>
                {RHFCheckboxes && RHFCheckboxes.map((row: JSX.Element) => row)}
              </FormControl>
            </Box>
          </Grid>
          <Grid size={4}>
            <Box
              sx={{
                background: highlightedRHF && columnColour2,
                height: "100%",
                marginLeft: "-" + rippleOffset + "px",
              }}
            >
              <FormControl
                sx={{
                  width: "100%",
                  marginLeft: rippleOffset + "px",
                  marginTop: marginTop,
                }}
              >
                {HFCheckBoxes[highlightedRHF] &&
                  HFCheckBoxes[highlightedRHF].map((row: JSX.Element) => row)}
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
              <FormControl
                sx={{
                  width: "100%",
                  marginLeft: rippleOffset + "px",
                  marginTop: marginTop,
                }}
              >
                {HospitalCheckBoxes[highlightedHF] &&
                  HospitalCheckBoxes[highlightedHF].map(
                    (row: JSX.Element) => row,
                  )}
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Avbryt</Button>
        <Button onClick={handleSubmit}>
          {"OK (" + unitSelection.length + ")"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
