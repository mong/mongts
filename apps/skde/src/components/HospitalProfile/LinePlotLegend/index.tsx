import { Stack, Typography } from "@mui/material";
import { newLevelSymbols, Hoverbox } from "qmongjs";

export const LinePlotLegend = (props: {
  itemSpacing: number;
  symbolSpacing: number;
}) => {
  const { itemSpacing, symbolSpacing } = props;

  return (
    <>
      <Stack direction="row" spacing={itemSpacing} alignItems="center">
        <Hoverbox
          title="Viser andel eller antall kvalitetsindikatorer som har oppnådd høy måloppnåelse i kvalitetsregisteret"
          placement="top"
          offset={[20, 20]}
        >
          <Stack direction="row" spacing={symbolSpacing} alignItems="center">
            {newLevelSymbols("H")}
            <Typography>Høy måloppnåelse</Typography>
          </Stack>
        </Hoverbox>
        <Hoverbox
          title="Viser andel eller antall kvalitetsindikatorer som har oppnådd middels måloppnåelse i kvalitetsregisteret"
          placement="top"
          offset={[20, 20]}
        >
          <Stack direction="row" spacing={symbolSpacing} alignItems="center">
            {newLevelSymbols("M")}
            <Typography>Moderat måloppnåelse</Typography>
          </Stack>
        </Hoverbox>
        <Hoverbox
          title="Viser andel eller antall kvalitetsindikatorer som har oppnådd lav måloppnåelse i kvalitetsregisteret"
          placement="top"
          offset={[20, 20]}
        >
          <Stack direction="row" spacing={symbolSpacing} alignItems="center">
            {newLevelSymbols("L")}
            <Typography>Lav måloppnåelse</Typography>
          </Stack>
        </Hoverbox>
      </Stack>
    </>
  );
};
