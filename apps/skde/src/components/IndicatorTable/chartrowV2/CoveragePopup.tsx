import { Button } from "@mong/material-ui";
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
import type { OptsTu } from "types";
import { ChartRowV2 } from ".";

type CoveragePopupProps = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  context: string;
  medfield: string;
  unitNames: string[];
  year: number;
  treatmentUnitsByLevel: OptsTu[];
  indID: string;
  registryName: string;
};

export const CoveragePopup = (props: CoveragePopupProps) => {
  const {
    open,
    setOpen,
    context,
    medfield,
    unitNames,
    year,
    treatmentUnitsByLevel,
    indID,
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

  if (nestedDataQuery.isFetching) {
    return (
      <Dialog open={open} fullWidth={true} maxWidth={"lg"}>
        <DialogTitle>Dekningsgrad</DialogTitle>
        <DialogContent>Laster</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Lukk</Button>
        </DialogActions>
      </Dialog>
    );
  }

  const indData = nestedDataQuery.data?.[0].indicatorData[0];

  return (
    <Dialog open={open} fullWidth={true} maxWidth={"lg"}>
      <DialogTitle>Dekningsgrad</DialogTitle>
      <DialogContent>
        <ChartRowV2
          data={indData}
          unitNames={unitNames}
          year={year}
          context={context}
          type={type}
          medfield={medfield}
          treatmentUnitsByLevel={treatmentUnitsByLevel}
          indID={indID}
          registryName={registryName}
          coverage={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Lukk</Button>
      </DialogActions>
    </Dialog>
  );
};
