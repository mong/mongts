import { useState } from "react";
import { LowLevelIndicatorList } from "qmongjs";
import { ExpandableItemBox } from "../ExpandableItemBox";
import { ChipSelection } from "../../ChipSelection";
import { Box, Typography } from "@mui/material";
import { formatUnitNameIfNational } from "../../../helpers/functions/formatUnitNameIfNational";

type HospitalProfileLowLevelTableProps = {
  unitName: string;
  boxMaxHeight: number;
  titlePadding: number;
  titleStyle: { marginTop: number; marginLeft: number };
  textMargin: number;
  unitFullName: string;
  lastYear: number;
};

export const HospitalProfileLowLevelTable = (
  props: HospitalProfileLowLevelTableProps,
) => {
  const {
    unitName,
    boxMaxHeight,
    titlePadding,
    titleStyle,
    textMargin,
    unitFullName,
    lastYear,
  } = props;
  const [showDataQuality, setShowDataQuality] = useState(false);

  return (
    <ExpandableItemBox
      collapsedHeight={boxMaxHeight}
      collapsedText="Vis flere"
      expandedText="Vis færre"
    >
      <Box padding={titlePadding}>
        <Typography variant="h5" style={titleStyle}>
          <b>{"Siste års måloppnåelse for " + lastYear}</b>
        </Typography>
        <div style={{ margin: textMargin }}>
          <Typography variant="body1">
            {"Her er en interaktiv liste som gir oversikt over kvalitetsindikatorene ut fra siste års måloppnåelse for " +
              formatUnitNameIfNational(unitFullName, false) +
              ". Du kan trykke på indikatorene for å se mer informasjon om indikatoren og følge oppgitt lenke til mer detaljert beskrivelse av indikatoren."}
          </Typography>
        </div>
        <ChipSelection
          leftChipLabel="Vis kvalitetsindikatorer"
          rightChipLabel="Vis datakvalitet"
          leftChipHelpText="Hver indikator er fremstilt som et symbol som viser om indikatoren er høy, middels eller lav måloppnåelse. Du kan også trykke på fagområde for å se hvilke register kvalitetsindikatorene kommer fra."
          rightChipHelpText="Datakvalitet representerer for eksempel dekningsgrad som angir andel pasienter eller hendelser som registreres, i forhold til antall som skal registreres i registeret fra behandlingsstedet. Hver indikator er fremstilt som et symbol som viser om indikatoren er høy, middels eller lav måloppnåelse. Du kan også trykke på fagområde for å se hvilke register datakvaliteten er rapportert fra."
          hoverBoxOffset={[20, 20]}
          hoverBoxPlacement="top"
          hoverBoxMaxWidth={400}
          state={showDataQuality}
          stateSetter={setShowDataQuality}
          trueChip="right"
        />
      </Box>

      <LowLevelIndicatorList
        context={"caregiver"}
        type={showDataQuality ? "dg" : "ind"}
        unitNames={[unitName || "Nasjonalt"]}
        year={lastYear}
      />
    </ExpandableItemBox>
  );
};
