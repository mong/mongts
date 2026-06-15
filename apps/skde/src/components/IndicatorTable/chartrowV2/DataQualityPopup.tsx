import { Button, ContextCard } from "@mong/material-ui";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchIndicatorParams } from "qmongjs/src/helpers/hooks";
import { useIndicatorQuery } from "qmongjs/src/helpers/hooks";
import type { Dispatch, SetStateAction } from "react";
import type { DataPoint, OptsTu } from "types";
import { ChartRowV2 } from ".";

type CoveragePopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  context: string;
  medfield: string;
  unitNames: string[];
  year: number;
  treatmentUnitsByLevel: OptsTu[];
  dataQualityIndId: string;
  registryName: string;
};

export const DataQualityPopup = (props: CoveragePopupProps) => {
  const {
    open,
    setOpen,
    context,
    medfield,
    unitNames,
    year,
    treatmentUnitsByLevel,
    dataQualityIndId,
    registryName,
  } = props;

  const type = "dg";

  const handleClose = () => {
    setOpen(false);
  };

  const queryParams: FetchIndicatorParams = {
    context: context,
    registerShortName: medfield, // Not the same as the short_name column in the database
    unitNames: unitNames,
    type: type,
  };

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const nestedDataQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    ...queryParams,
    nested: true,
  });

  const LoadingDialog = (
    <Dialog open={open} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle>Dekningsgrad</DialogTitle>
      <DialogContent>Laster</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Lukk</Button>
      </DialogActions>
    </Dialog>
  );

  const NoDataDialog = (
    <Dialog open={open} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle>Dekningsgrad</DialogTitle>
      <DialogContent>Ingen data</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Lukk</Button>
      </DialogActions>
    </Dialog>
  );

  // No data
  if (!dataQualityIndId) {
    return NoDataDialog;
  }

  // Loading
  if (nestedDataQuery.isFetching) {
    return LoadingDialog;
  }

  const regData = nestedDataQuery.data;

  // No data
  if (!regData) {
    return NoDataDialog;
  }

  const indData = regData[0].indicatorData;

  // No data
  if (!indData) {
    return NoDataDialog;
  }

  const dgIndData = indData.filter((row: DataPoint) => {
    return row.indicatorID === dataQualityIndId;
  });

  if (!dgIndData[0]) {
    return NoDataDialog;
  }

  const contextCardDescription =
    "Data anses å ha god kvalitet når de er relevante, korrekte, komplette og tilgjengelige for brukerne i rett tid og format. " +
    "Arbeidet med datakvalitet omfatter derfor mer enn bare selve datainnsamlingen. " +
    "Det handler om planlegging, design, dokumentasjon, tekniske løsninger, rutiner for oppfølging og hvordan data faktisk blir brukt.";

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle>
        <Typography variant="h4">Datakvalitet</Typography>
      </DialogTitle>
      <Typography variant="body2" sx={{ paddingLeft: 4, paddingRight: 4 }}>
        God datakvalitet er en forutsetning for at kvalitetsregistre skal kunne
        gi pålitelig kunnskap om helsetjenesten, støtte kvalitetsforbedring og
        legge grunnlag for god forskning.
      </Typography>
      <DialogContent>
        <ChartRowV2
          data={dgIndData[0]}
          unitNames={unitNames}
          year={year}
          context={context}
          type={type}
          medfield={medfield}
          treatmentUnitsByLevel={treatmentUnitsByLevel}
          indID={dataQualityIndId}
          registryName={registryName}
          showDGButton={false}
        />
      </DialogContent>
      <Box sx={{ paddingLeft: 4, paddingRight: 4 }}>
        {/* @ts-expect-error Component will support empty label in next version */}
        <ContextCard
          title="Om datakvalitet"
          description={contextCardDescription}
        />
      </Box>
      <DialogActions>
        <Button onClick={handleClose}>Lukk</Button>
      </DialogActions>
    </Dialog>
  );
};
