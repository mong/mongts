import { Box, Button, ContextCard, LoadingLogo } from "@mong/material-ui";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import type { UseQueryResult } from "@tanstack/react-query";
import type { FetchIndicatorParams } from "qmongjs/src/helpers/hooks";
import { useIndicatorQuery } from "qmongjs/src/helpers/hooks";
import type { Dispatch, SetStateAction } from "react";
import type { DataPoint, OptsTu } from "types";
import { DataQualityChartRow } from "./DataQualityChartRow";

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
    <Dialog open={open} fullWidth={true} maxWidth={"lg"} scroll="body">
      <DialogTitle>
        <h3 className="font-regular">Datakvalitet</h3>
      </DialogTitle>
      <DialogContent>
        <LoadingLogo />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Lukk</Button>
      </DialogActions>
    </Dialog>
  );

  const NoDataDialog = (
    <Dialog open={open} fullWidth={true} maxWidth={"lg"} scroll="body">
      <DialogTitle>
        <h3 className="font-regular">Datakvalitet</h3>
      </DialogTitle>
      <DialogContent>
        <h6 className="pl-7 pr-6 font-regular">Ingen data</h6>
      </DialogContent>
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
    <Dialog open={open} fullWidth={true} maxWidth={"lg"} scroll="body">
      <DialogTitle>
        <h3 className="font-regular">Datakvalitet</h3>
      </DialogTitle>
      <h6 className="pl-7 pr-6 font-regular">
        God datakvalitet er en forutsetning for at kvalitetsregistre skal kunne
        gi pålitelig kunnskap om helsetjenesten, støtte kvalitetsforbedring og
        legge grunnlag for god forskning.
      </h6>
      <DialogContent>
        <DataQualityChartRow
          data={dgIndData[0]}
          unitNames={unitNames}
          year={year}
          context={context}
          type={type}
          medfield={medfield}
          treatmentUnitsByLevel={treatmentUnitsByLevel}
          indID={dataQualityIndId}
          registryName={registryName}
        />
      </DialogContent>
      <Box>
        <ContextCard
          title="Om datakvalitet"
          description={contextCardDescription}
          updated="" //denne er required, men kan settes til blank
        />
      </Box>
      <DialogActions>
        <Button onClick={handleClose}>Lukk</Button>
      </DialogActions>
    </Dialog>
  );
};
