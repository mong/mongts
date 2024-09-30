import { ItemBox } from "../HospitalProfileStyles";
import { Typography, Stack } from "@mui/material";
import { ScreenRotation } from "@mui/icons-material";

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
        <ScreenRotation fontSize="large" sx={{ transform: `scale(2.0)` }} />
      </Stack>
    </ItemBox>
  );
};
