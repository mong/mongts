import { AppBar, Toolbar } from "@mui/material";

type AppBarProps = {
  children?: React.ReactElement<unknown>;
};

export const TreatmentQualityAppBarV2 = ({ children }: AppBarProps) => {
  return (
    <AppBar position="sticky" color="transparent" elevation={0}>
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
};
