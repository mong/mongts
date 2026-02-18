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
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { UseQueryResult } from "@tanstack/react-query";
import { useMedicalFieldsQuery, useUnitNamesQuery } from "qmongjs";

type MedicalFieldPopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<string[]>>;
};

export const MedicalFieldPopup = (props: MedicalFieldPopupProps) => {
  const { open, setOpen, onSubmit } = props;

  const [selection, setSelection] = useState<string>("");

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const medicalFieldsQuery: UseQueryResult<any, unknown> =
    useMedicalFieldsQuery();

  const registries = medicalFieldsQuery.data
    ? medicalFieldsQuery.data.map((row) => row.registers).flat()
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
      <DialogTitle>Velg fagområde</DialogTitle>
      <DialogContent>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel>Fagområde</InputLabel>
          <Select value={selection} onChange={handleChange} label="Fagområde">
            {registries.map((registry) => {
              return <MenuItem value={registry}>{registry}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Subscribe</Button>
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const unitNamesQuery: UseQueryResult<any, unknown> = useUnitNamesQuery(
    "all",
    context,
    type,
  );

  const rhfs = unitNamesQuery.data
    ? unitNamesQuery.data.nestedUnitNames.map((row) => row.rhf)
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
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};
