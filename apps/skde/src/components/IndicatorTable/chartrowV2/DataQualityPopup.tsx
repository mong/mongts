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
import type { DataPoint, IndicatorData, OptsTu } from "types";
import { DataQualityChartRow } from "./DataQualityChartRow";

type CoveragePopupProps = {
  data: IndicatorData | undefined;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  context: "caregiver" | "resident" | undefined;
  medfield: string;
  unitNames: string[];
  year: number;
  treatmentUnitsByLevel: OptsTu[];
  dataQualityIndId: string;
  registryName: string;
};

export const DataQualityPopup = (props: CoveragePopupProps) => {
  const {
    data,
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

  const handleClose = () => {
    setOpen(false);
  };

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
  if (data === undefined) {
    return NoDataDialog;
  }

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"lg"} scroll="body">
      <DialogTitle>
        <h3 className="font-regular">{data.indicatorTitle}</h3>
      </DialogTitle>
      <DialogContent>
        <DataQualityChartRow
          data={data}
          unitNames={unitNames}
          year={year}
          context={context}
          type={"dg"}
          medfield={medfield}
          treatmentUnitsByLevel={treatmentUnitsByLevel}
          indID={dataQualityIndId}
          registryName={registryName}
        />
      </DialogContent>
      <Box>
        <ContextCard
          title="Om datakvalitetsindikatoren"
          description={data.longDescription ?? "Ingen beskrivelse"}
          updated="" //denne er required, men kan settes til blank
        />
      </Box>
      <DialogActions>
        <Button onClick={handleClose}>Lukk</Button>
      </DialogActions>
    </Dialog>
  );
};
