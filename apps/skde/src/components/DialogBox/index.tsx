import {
  Dialog,
  DialogTitle,
  Select,
  MenuItem,
  DialogContent,
  DialogActions,
  Button,
  SelectChangeEvent,
  InputLabel,
  FormControl,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { useMedicalFieldsQuery, useUnitNamesQuery } from "qmongjs";
import { Medfield } from "types";
import { NestedTreatmentUnitName } from "types";

type MedicalFieldPopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<string[]>>;
};

export const MedicalFieldPopup = (props: MedicalFieldPopupProps) => {
  const { open, setOpen, onSubmit } = props;

  const [selection, setSelection] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const medicalFieldsQuery: UseQueryResult<any, unknown> =
    useMedicalFieldsQuery();

  const MedfieldCheckboxes =
    medicalFieldsQuery.data &&
    medicalFieldsQuery.data.map((medfield: Medfield) => {
      const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked && !selection.includes(medfield.name)) {
          const newSelection = [...selection, medfield.name];
          setSelection([...newSelection]);
        } else if (!event.target.checked && selection.includes(medfield.name)) {
          const ind = selection.indexOf(medfield.name);
          const newSelection = [...selection];
          newSelection.splice(ind, 1);
          setSelection(newSelection);
        }
      };

      return (
        <FormControlLabel
          label={medfield.name}
          key={medfield.shortName}
          control={
            <Checkbox
              checked={selection.includes(medfield.name)}
              onChange={handleChange}
              key={medfield.name}
            />
          }
        />
      );
    });

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const selectedRegistries = medicalFieldsQuery.data
      .filter((medfield: Medfield) => {
        return selection.includes(medfield.name);
      })
      .map((medfield: Medfield) => {
        return medfield.registers;
      })
      .flat();

    onSubmit(selectedRegistries);
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Velg fagområde</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, width: 300 }}>
          {MedfieldCheckboxes && MedfieldCheckboxes.map((row) => row)}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Avbryt</Button>
        <Button onClick={handleSubmit}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};

type TreatmentUnitPopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<string[]>>;
  context: string;
  type: string;
};

export const TreatmentUnitPopup = (props: TreatmentUnitPopupProps) => {
  const { open, setOpen, onSubmit, context, type } = props;

  const [selection, setSelection] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    context,
    type,
  );

  const rhfs = unitNamesQuery.data
    ? unitNamesQuery.data.nestedUnitNames.map(
        (row: NestedTreatmentUnitName) => row.rhf,
      )
    : [];

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit([selection]);
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setSelection(value);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Velg behandlingssted</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel>Behandlingsenhet</InputLabel>
          <Select
            value={selection}
            onChange={handleChange}
            label="Behandlingsenhet"
          >
            {rhfs.map((rhf) => {
              return <MenuItem value={rhf}>{rhf}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Avbryt</Button>
        <Button onClick={handleSubmit}>OK</Button>
      </DialogActions>
    </Dialog>
  );
};
