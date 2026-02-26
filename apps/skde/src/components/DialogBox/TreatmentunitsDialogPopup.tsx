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
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { useUnitNamesQuery } from "qmongjs";
import { NestedTreatmentUnitName } from "types";

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

  const unitNames =
    unitNamesQuery.data &&
    unitNamesQuery.data.nestedUnitNames.sort(
      (a: NestedTreatmentUnitName, b: NestedTreatmentUnitName) => {
        return a.rhf_sort - b.rhf_sort;
      },
    );

  const RHFCheckboxes =
    unitNames &&
    (unitNames.map((row: NestedTreatmentUnitName) => {
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Add RHF to the selection
        if (event.target.checked) {
          // May contain duplicates
          const newRHFSelection = [...unitSelection, row.rhf];

          setUnitSelection([...new Set(newRHFSelection)]);
        } else {
          const newRHFSelection = [...unitSelection].filter((rhf) => {
            return rhf !== row.rhf;
          });
          setUnitSelection([...new Set(newRHFSelection)]);
        }
      };

      const hfChecked = () => {
        const selectedSet = new Set([...unitSelection]);
        const hfSet = new Set(row.hf.map((el) => el.hf));
        return selectedSet.intersection(hfSet).size > 0;
      };

      const hospitalsChecked = () => {
        const selectedSet = new Set([...unitSelection]);
        const hospitals = row.hf
          .map((hf) => {
            return hf.hospital;
          })
          .flat();

        const hospitalSet = new Set([...hospitals]);
        return selectedSet.intersection(hospitalSet).size > 0;
      };

      return (
        <FormControlLabel
          label={row.rhf}
          key={row.rhf}
          onMouseEnter={() => {
            setHighlightedRHF(row.rhf);
          }}
          control={
            <Checkbox
              checked={unitSelection.includes(row.rhf)}
              indeterminate={
                !unitSelection.includes(row.rhf) &&
                (hfChecked() || hospitalsChecked())
              }
              onChange={handleChange}
              key={row.rhf + "_checkbox"}
            />
          }
        />
      );
    }) as JSX.Element[]);

  const HFCheckBoxes = {};
  const HospitalCheckBoxes = {};

  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  unitNames &&
    unitNames.map((unitName: NestedTreatmentUnitName) => {
      const hfs = unitName.hf.sort((a, b) => {
        return a.hf_sort - b.hf_sort;
      });

      // Add hospitals to the list
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
        sx={{ height: 1000 }}
        onMouseLeave={() => {
          setHighlightedRHF("");
          setHighlightedHF("");
        }}
      >
        <Grid container spacing={2}>
          <Grid size={4}>
            <FormControl sx={{ m: 1, width: "100%" }}>
              {RHFCheckboxes && RHFCheckboxes.map((row: JSX.Element) => row)}
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl sx={{ m: 1, width: "100%" }}>
              {HFCheckBoxes[highlightedRHF] &&
                HFCheckBoxes[highlightedRHF].map((row: JSX.Element) => row)}
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl sx={{ m: 1, width: "100%" }}>
              {HospitalCheckBoxes[highlightedHF] &&
                HospitalCheckBoxes[highlightedHF].map(
                  (row: JSX.Element) => row,
                )}
            </FormControl>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Avbryt</Button>
        <Button onClick={handleSubmit}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};
