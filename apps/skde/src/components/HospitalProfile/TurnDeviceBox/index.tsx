import ScreenRotationIcon from "@mui/icons-material/ScreenRotation";
import { Stack, Typography } from "@mui/material";
import { ItemBox } from "../HospitalProfileStyles";

type TurnDeviceBoxProps = {
  height: number;
  padding: number;
};

export const TurnDeviceBox = (props: TurnDeviceBoxProps) => {
  const { height, padding } = props;

  return (
    <ItemBox height={height}>
      <Stack
        direction="column"
        spacing={8}
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "30%",
          marginLeft: padding,
          marginRight: padding,
        }}
      >
        <Typography variant="h5" align="center">
          Snu enheten for å se innholdet i denne boksen
        </Typography>
        <ScreenRotationIcon fontSize="large" sx={{ transform: `scale(2.0)` }} />
      </Stack>
    </ItemBox>
  );
};
