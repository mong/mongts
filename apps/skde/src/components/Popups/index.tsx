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
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";

export type MedicalFieldPopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSubmit: Dispatch<SetStateAction<string[]>>;
  initialSelection: string[];
};

export const MedicalFieldPopup = (props: MedicalFieldPopupProps) => {
  const { open, setOpen, onSubmit, initialSelection } = props;

  const [selection, setSelection] = useState(initialSelection);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    onSubmit(selection);
    setOpen(false);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSelection([event.target.value] as string[]);
  };

  return (
    <Dialog open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent>
        <InputLabel>Fagområde</InputLabel>
        <Select onChange={handleChange} sx={{ width: 100 }}>
          <MenuItem value="Ingen">Ingen</MenuItem>
          <MenuItem value="hjerneslag">Hjerneslag</MenuItem>
          <MenuItem value="hjerteinfarkt">Hjerteinfarkt</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
};
