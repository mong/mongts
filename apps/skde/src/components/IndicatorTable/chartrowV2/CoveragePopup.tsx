import { Button } from "@mong/material-ui";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { Dispatch, SetStateAction } from "react";

type CoveragePopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const CoveragePopup = (props: CoveragePopupProps) => {
  const { open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle>Dekningsgrad</DialogTitle>
      <DialogContent>Innhold kommer</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Lukk</Button>
      </DialogActions>
    </Dialog>
  );
};
