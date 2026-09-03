import { ToggleButton, ToggleButtonGroup } from "@mong/material-ui";
import {
  Box,
  Stack,
  TableBody,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { UseQueryResult } from "@tanstack/react-query";
import { useIndicatorQuery } from "qmongjs";
import { backgroundColour } from "qmongjs/src/app_config";
import {
  type FetchIndicatorParams,
  useResidentDataQuery,
  useUnitNamesQuery,
} from "qmongjs/src/helpers/hooks";
import React, { useState } from "react";
import type {
  DataPoint,
  IndicatorData,
  OptsTu,
  RegisterData,
  ResidentData,
} from "types";
import { IndicatorSection } from "./IndicatorSection";
import {
  StyledTableCellEnd,
  StyledTableCellMiddle,
  StyledTableCellStart,
} from "./IndicatorTableStyles";

type RegistrySectionProps = {
  unitNames: string[];
  levels: string;
  medfield: string;
  openRowID: string;
  setOpenRowID: React.Dispatch<React.SetStateAction<string>>;
  context: string;
  type: string;
  year: number;
  chartColours: string[];
};

export const RegistrySectionV2 = (props: RegistrySectionProps) => {
  const {
    unitNames,
    levels,
    medfield,
    openRowID,
    setOpenRowID,
    context,
    type,
    year,
    chartColours,
  } = props;
  const [currentContext, setCurrentContext] = useState(context);

  const queryParams: FetchIndicatorParams = {
    context: currentContext,
    registerShortName: medfield, // Not the same as the short_name column in the database
    unitNames: unitNames,
    type: type,
  };

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const nestedDataQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    ...queryParams,
    nested: true,
  });

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const residentDataQuery: UseQueryResult<any> = useResidentDataQuery(medfield);
  const unitNamesByLevelQuery = useUnitNamesQuery(medfield, context, type);

  if (
    nestedDataQuery.isFetching ||
    unitNamesByLevelQuery.isFetching ||
    residentDataQuery.isFetching
  ) {
    return null;
  }

  const treatmentUnitsByLevel = unitNamesByLevelQuery.data.opts_tu as OptsTu[];

  const rowData = nestedDataQuery.data as RegisterData[];

  // Check if the registry has resident data for the selected year
  // and treatment units
  const registryHasResidentData =
    residentDataQuery.data &&
    residentDataQuery.data.map((row: ResidentData) => {
      return row.year === year && unitNames.includes(row.unitName);
    }).length > 0;

  rowData.sort((a: RegisterData, b: RegisterData) => {
    return (
      Math.min(...a.medfieldID) - Math.min(...b.medfieldID) ||
      (a.registerShortName === b.registerShortName
        ? 0
        : a.registerShortName < b.registerShortName
          ? -1
          : 1)
    );
  });

  const regData = rowData[0];

  if (!regData?.indicatorData) {
    return null;
  }

  regData.indicatorData.sort((a: IndicatorData, b: IndicatorData) => {
    return a.sortingName === b.sortingName
      ? 0
      : a.sortingName === null
        ? 1
        : b.sortingName === null
          ? -1
          : a.sortingName < b.sortingName
            ? -1
            : 1;
  });

  const dataAvailable =
    regData.indicatorData
      .flatMap((row: IndicatorData) => row.data)
      .filter((row: DataPoint) => row.year === year).length > 0;

  const handleClick = () => {
    setCurrentContext(
      currentContext === "caregiver" ? "resident" : "caregiver",
    );
  };

  return (
    <React.Fragment>
      <TableHead>
        <TableRow key={`${regData.registerName}-toprow`}>
          <StyledTableCellStart
            key={regData.registerName}
            sx={{
              backgroundColor: backgroundColour,
              width: "3rem",
            }}
            colSpan={unitNames.length + 2}
          >
            <Stack
              direction="row"
              spacing={2}
              sx={{
                alignItems: "center",
              }}
            >
              <div
                lang="no"
                style={{ wordWrap: "break-word", hyphens: "auto" }}
              >
                <Typography variant="h3">
                  {regData.registerShortName}
                </Typography>
              </div>
              {registryHasResidentData && (
                <ToggleButtonGroup
                  onChange={handleClick}
                  value={[currentContext]}
                >
                  <ToggleButton aria-label="toggle caregiver" value="caregiver">
                    Behandlingssted
                  </ToggleButton>
                  <ToggleButton aria-label="toggle resident" value="resident">
                    Opptaksområde
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            </Stack>
          </StyledTableCellStart>
        </TableRow>
        {dataAvailable && (
          <TableRow key={`${regData.registerName}-row`}>
            <StyledTableCellStart
              sx={{
                backgroundColor: backgroundColour,
                width: "3rem",
              }}
            >
              {`Kvalitetsindikatorer fra ${regData.registerFullName}`}
            </StyledTableCellStart>
            <StyledTableCellMiddle
              sx={{
                backgroundColor: backgroundColour,
                width: "3rem",
              }}
            >
              Ønsket målnivå
            </StyledTableCellMiddle>
            {unitNames.map((row, index, arr) => {
              let CellType:
                | typeof StyledTableCellEnd
                | typeof StyledTableCellMiddle;

              if (index === arr.length - 1) {
                CellType = StyledTableCellEnd;
              } else {
                CellType = StyledTableCellMiddle;
              }

              return (
                <CellType
                  align="left"
                  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
                  key={regData.registerName + index}
                  sx={{ backgroundColor: backgroundColour }}
                  width={"12rem"}
                >
                  <div
                    lang="no"
                    style={{ wordWrap: "break-word", hyphens: "auto" }}
                  >
                    {row}
                  </div>
                </CellType>
              );
            })}
          </TableRow>
        )}
      </TableHead>
      <TableBody>
        {registryHasResidentData &&
          currentContext === "caregiver" &&
          !dataAvailable && (
            <Box
              sx={{
                marginLeft: 2,
                marginBottom: 4,
              }}
            >
              <Typography variant="h6">
                Registeret har data på opptaksområde
              </Typography>
            </Box>
          )}
        <IndicatorSection
          key={regData.registerName}
          unitNames={unitNames}
          medfield={medfield}
          levels={levels}
          data={regData.indicatorData}
          openRowID={openRowID}
          setOpenRowID={setOpenRowID}
          registryName={regData.registerFullName}
          context={currentContext}
          type={type}
          year={year}
          chartColours={chartColours}
          treatmentUnitsByLevel={treatmentUnitsByLevel}
          residentData={currentContext === "resident"}
          showDGButton={true}
        />
      </TableBody>
    </React.Fragment>
  );
};
