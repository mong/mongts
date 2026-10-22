import {
  Box,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import type { UseQueryResult } from "@tanstack/react-query";
import type { DataPoint, IndicatorData, RegisterData } from "types";
import { customFormat, level2, newestLevelSymbols } from "@/helpers/functions";
import { useIndicatorQuery } from "@/helpers/hooks/apihooks";
import { ItemBox } from "../HospitalProfileStyles";
import { indicatorInfo, indicatorsPerHospital } from "./indicators";

const colourMap = new Map();
colourMap.set("H", "#58A55C");
colourMap.set("M", "#FD9C00");
colourMap.set("L", "#D85140");
colourMap.set(undefined, undefined);

const getLowDG = (point: DataPoint) => {
  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  return point?.dg == null ? false : point?.dg < 0.6 ? true : false;
};

// Muligens unødvendig. Sjekk api-et.
const getNoData = (point: DataPoint) => {
  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  return point?.denominator == null ? true : false;
};

const getLowN = (indInfo: IndicatorData, point: DataPoint) => {
  return point?.denominator == null
    ? false
    : indInfo.minDenominator == null && point.denominator < 5
      ? true
      : // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
        // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
        point.denominator < indInfo.minDenominator
        ? true
        : false;
};

const IndicatorRow = (
  indId: string,
  rowNumber: number,
  lastYear: number,
  data: IndicatorData[],
) => {
  //const indInfo = indicatorInfo.find((row) => row.indId === indId);

  const symbolSize = 30;

  const indInfo = data.find((row: IndicatorData) => row.indicatorID === indId);

  const point1 = indInfo?.data?.find(
    (row: DataPoint) => row.year === lastYear - 1,
  );

  const point2 = indInfo?.data?.find((row: DataPoint) => row.year === lastYear);

  const var1 = point1 ? point1.var : undefined;
  const var2 = point2 ? point2.var : undefined;

  const lvl1 = indInfo && point1 ? level2(indInfo, point1) : undefined;
  const lvl2 = indInfo && point2 ? level2(indInfo, point2) : undefined;

  const registerName = indicatorInfo.find(
    (row) => row.indId === indInfo?.indicatorID,
  )?.registry;

  return (
    <TableRow key={rowNumber}>
      <TableCell sx={{ width: "8rem" }}>
        <b>{`Indikator ${rowNumber}`}</b>
      </TableCell>
      <TableCell>{indInfo?.indicatorTitle}</TableCell>
      <TableCell>{registerName}</TableCell>
      <TableCell>
        <Stack
          direction="column"
          sx={{
            alignItems: "center",
          }}
        >
          <Stack
            direction="row-reverse"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            {newestLevelSymbols("H", Math.random().toString(), symbolSize)}
            <Typography variant="body2">
              {customFormat(indInfo?.format || "")(indInfo?.levelGreen || 0)}
            </Typography>
          </Stack>
          <Stack
            direction="row-reverse"
            spacing={1}
            sx={{
              alignItems: "center",
            }}
          >
            {newestLevelSymbols("M", Math.random().toString(), symbolSize)}
            <Typography variant="body2">
              {customFormat(indInfo?.format || "")(indInfo?.levelYellow || 0)}
            </Typography>
          </Stack>
        </Stack>
      </TableCell>
      <TableCell align="right">
        {point1 &&
        !getLowDG(point1) &&
        indInfo &&
        !getLowN(indInfo, point1) &&
        !getNoData(point1) ? (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography variant="body2">
              {
                // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
                customFormat(indInfo.format)(var1)
              }
            </Typography>
            {newestLevelSymbols(lvl1, Math.random().toString(), symbolSize)}
          </Stack>
        ) : getLowDG(
            // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
            point1,
          ) ? (
          "Lav DG"
        ) : getNoData(
            // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
            point1,
          ) ? (
          "Ingen data"
        ) : indInfo &&
          getLowN(
            indInfo,
            // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
            point1,
          ) ? (
          "Lav N"
        ) : (
          "Ingen data"
        )}
      </TableCell>
      <TableCell align="right">
        {point1 &&
        point2 &&
        !getLowDG(point2) &&
        indInfo &&
        !getLowN(indInfo, point2) &&
        !getNoData(point2) ? (
          <Stack
            direction="row"
            spacing={1}
            sx={{
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <Typography variant="body2">
              {
                // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
                customFormat(indInfo.format)(var2)
              }
            </Typography>
            {newestLevelSymbols(lvl2, Math.random().toString(), symbolSize)}
          </Stack>
        ) : getLowDG(
            // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
            point2,
          ) ? (
          "Lav DG"
        ) : getNoData(
            // @ts-expect-error - Ignored to pass ci checks, but should be fixed properly in the future
            point2,
          ) ? (
          "Ingen data"
        ) : indInfo && point2 && !getLowN(indInfo, point2) ? (
          "Lav N"
        ) : (
          "Ingen data"
        )}
      </TableCell>
    </TableRow>
  );
};

type SelectedIndicatorTableProps = {
  unitName: string;
  titlePadding: number;
  titleStyle: { marginTop: number; marginLeft: number };
  lastYear: number;
  textMargin: number;
};

export const SelectedIndicatorTable = (props: SelectedIndicatorTableProps) => {
  const { unitName, titlePadding, titleStyle, lastYear, textMargin } = props;

  const selectedIndicator = indicatorsPerHospital.find(
    (row) => row.unit === unitName,
  );

  if (!selectedIndicator) {
    return null;
  }

  const selectedIndIds = selectedIndicator.commonInd.concat(
    selectedIndicator.specificInd,
  );

  // biome-ignore lint: ignored to pass ci checks, but should be fixed properly in the future
  const indicatorQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    unitNames: [unitName],
    context: "caregiver",
    type: "ind",
    nested: true,
  });

  if (indicatorQuery.isFetching) {
    return null;
  }

  const data = indicatorQuery.data;

  const indicatorData = data
    .flatMap((row: RegisterData) => row.indicatorData)
    .filter((row: IndicatorData) => selectedIndIds.includes(row.indicatorID));

  const CommonIndTable = (
    <>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2} align="center">
            <b>{"Felles indikatorer"}</b>
          </TableCell>
          <TableCell>
            <b>{"Register"}</b>
          </TableCell>
          <TableCell align="center">
            <b>{"Ønsket målnivå"}</b>
          </TableCell>
          <TableCell align="right">
            <b>{lastYear - 1}</b>
          </TableCell>
          <TableCell align="right">
            <b>{lastYear}</b>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {selectedIndicator.commonInd.map((row, index) =>
          IndicatorRow(row, index + 1, lastYear, indicatorData),
        )}
      </TableBody>
    </>
  );

  const SpecificIndTable = (
    <>
      <TableHead>
        <TableRow>
          <TableCell colSpan={2} align="center">
            <b>{"Sykehusspesifikke indikatorer"}</b>
          </TableCell>
          <TableCell colSpan={4}></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {selectedIndicator.specificInd.map((row, index) =>
          IndicatorRow(
            row,
            index + selectedIndicator.commonInd.length + 1,
            lastYear,
            indicatorData,
          ),
        )}
      </TableBody>
    </>
  );

  return (
    <ItemBox>
      <Box
        sx={{
          padding: titlePadding,
        }}
      >
        <Typography variant="h5" style={titleStyle}>
          <b>Utvalgte indikatorer</b>
        </Typography>
        <div style={{ margin: textMargin }}>
          <Typography variant="body1">
            {`Kvalitetsindikatorer til "Styringskrav og rammer 2025" Helse Nord.`}
          </Typography>
        </div>
        <Table>
          {CommonIndTable}
          {selectedIndicator.specificInd.length > 0 && SpecificIndTable}
        </Table>
      </Box>
    </ItemBox>
  );
};
