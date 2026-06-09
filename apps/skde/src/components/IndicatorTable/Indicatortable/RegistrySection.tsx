import TableBody from "@mui/material/TableBody";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import type { UseQueryResult } from "@tanstack/react-query";
import { level2, skdeTheme, useIndicatorQuery } from "qmongjs";
import {
  type FetchIndicatorParams,
  useUnitNamesQuery,
} from "qmongjs/src/helpers/hooks";
import React from "react";
import type { IndicatorData, OptsTu, RegisterData } from "types";
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

export const RegistrySection = (props: RegistrySectionProps) => {
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

  const unitNamesByLevelQuery = useUnitNamesQuery(medfield, context, type);

  if (nestedDataQuery.isFetching || unitNamesByLevelQuery.isFetching) {
    return null;
  }

  const treatmentUnitsByLevel = unitNamesByLevelQuery.data.opts_tu as OptsTu[];

  const rowData = nestedDataQuery.data as RegisterData[];

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
  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  if (!regData || !regData.indicatorData) {
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

  // Sjekk om hele registerseksjonen skal filtreres bort på grunn av målnivåfilter
  let showSection: boolean;

  if (levels === undefined || levels === null || levels === "") {
    showSection = true;
  } else {
    showSection = !regData.indicatorData
      .map((indRow) => {
        return indRow.data
          ? !indRow.data
              .map((dataRow) => {
                return level2(indRow, dataRow) === levels;
              })
              // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
              .every((x) => x == false)
          : null;
      })
      // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
      .every((x) => x == false);
  }

  if (showSection) {
    return (
      <React.Fragment>
        <TableHead>
          <TableRow key={`${regData.registerName}-row`}>
            <StyledTableCellStart
              key={regData.registerName}
              sx={{
                backgroundColor: skdeTheme.palette.secondary.light,
                width: "3rem",
              }}
              colSpan={1}
            >
              <div
                lang="no"
                style={{ wordWrap: "break-word", hyphens: "auto" }}
              >
                {regData.registerFullName}
              </div>
            </StyledTableCellStart>
            <StyledTableCellMiddle
              sx={{
                backgroundColor: skdeTheme.palette.secondary.light,
                width: "3rem",
              }}
            >
              Ønsket målnivå
            </StyledTableCellMiddle>
            {unitNames.map((row, index, arr) => {
              // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
              let CellType;

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
                  sx={{ backgroundColor: skdeTheme.palette.secondary.light }}
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
        </TableHead>

        <TableBody>
          <IndicatorSection
            key={regData.registerName}
            unitNames={unitNames}
            medfield={medfield}
            levels={levels}
            data={regData.indicatorData}
            openRowID={openRowID}
            setOpenRowID={setOpenRowID}
            registryName={regData.registerFullName}
            context={context}
            type={type}
            year={year}
            chartColours={chartColours}
            treatmentUnitsByLevel={treatmentUnitsByLevel}
            residentData={false}
          />
        </TableBody>
      </React.Fragment>
    );
  } else {
    return null;
  }
};
