import { useState } from "react";
import { MedfieldTable, MedfieldTableProps } from "qmongjs";
import { ExpandableItemBox } from "../ExpandableItemBox";
import { ChipSelection } from "../../ChipSelection";
import { Box, Typography } from "@mui/material";
import { formatUnitNameIfNational } from "../../../helpers/functions/formatUnitNameIfNational";

type HospitalProfileMedfieldTableProps = {
  boxMaxHeight: number;
  titlePadding: number;
  titleStyle: { marginTop: number; marginLeft: number };
  textMargin: number;
  unitName: string;
  lastYear: number;
};

export const HospitalProfileMedfieldTable = (
  props: HospitalProfileMedfieldTableProps,
) => {
  const {
    boxMaxHeight,
    titlePadding,
    titleStyle,
    textMargin,
    unitName,
    lastYear,
  } = props;

  const [showDataQuality, setShowDataQuality] = useState(false);

  const medfieldTableProps: MedfieldTableProps = {
    unitNames: [unitName],
    context: "caregiver",
    type: "ind",
    treatmentYear: lastYear,
  };

  if (showDataQuality) {
    medfieldTableProps.type = "dg";
  } else {
    medfieldTableProps.type = "ind";
  }

  return (
    <ExpandableItemBox
      collapsedHeight={boxMaxHeight}
      collapsedText="Vis flere"
      expandedText="Vis færre"
    >
      <Box padding={titlePadding}>
        <Typography variant="h5" style={titleStyle}>
          <b>{"Kvalitetsindikatorer fordelt på fagområder for " + lastYear}</b>
        </Typography>
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
        <div style={{ margin: textMargin }}>
          <Typography variant="body1">
            {showDataQuality
              ? "Her vises dekningsgraden eller datakvaliteten til " +
                formatUnitNameIfNational(unitName, false) +
                " fordelt på fagområder som forteller om datagrunnlaget fra registrene."
              : "Her vises alle kvalitetsindikatorene fra " +
                formatUnitNameIfNational(unitName, false) +
                " fordelt på fagområder. Hver indikator er vist som et symbol for høy, middels eller lav måloppnåelse."}
          </Typography>
        </div>
      </Box>

      <MedfieldTable {...medfieldTableProps} />
    </ExpandableItemBox>
  );
};
