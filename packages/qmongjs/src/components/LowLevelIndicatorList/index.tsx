import React, { useState } from "react";
import { DataPoint, IndicatorData, Medfield, RegisterData } from "types";
import { UseQueryResult } from "@tanstack/react-query";
import {
  FetchIndicatorParams,
  useIndicatorQuery,
  useMedicalFieldsQuery,
} from "../../helpers/hooks";
import {
  customFormat,
  newLevelSymbols,
  level2,
  skdeTheme,
  Hoverbox,
} from "qmongjs";
import { styled } from "@mui/system";
import { ExpandCircleDownOutlined } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import {
  Box,
  MenuItem,
  Stack,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ArrowLink } from "../ArrowLink";
import { HelpOutline } from "@mui/icons-material";

const ExpandCircleUpOutlined = styled(ExpandCircleDownOutlined)({
  transform: "rotate(180deg)",
});

const result = (data: IndicatorData, point: DataPoint, dg?: boolean) => {
  let pointVar: number | null;

  if (dg) {
    pointVar = point && point.dg ? point.dg : null;
  } else {
    pointVar = point && point.var ? point.var : null;
  }

  return pointVar ? (
    <Stack direction="row">
      {customFormat(data.format!)(pointVar)}
      {!dg
        ? newLevelSymbols(
            level2(data, point),
            "indicator-row-symbol" + data.indicatorID,
          )
        : null}
    </Stack>
  ) : (
    "NA"
  );
};

const getDataSubset = (
  indData: IndicatorData[],
  year: number,
  index: number,
) => {
  const selectedLevel: "H" | "M" | "L" | undefined =
    index === 0 ? "H" : index === 1 ? "M" : index === 2 ? "L" : undefined;

  const dataSubset = indData.filter((indDataRow) => {
    if (indDataRow.data === undefined) {
      return false;
    }

    const lastYear = indDataRow.data.find((p) => {
      return p.year === year;
    });

    if (lastYear) {
      return level2(indDataRow, lastYear) === selectedLevel;
    } else return false;
  });

  return dataSubset;
};

const RegistrySection = (props: {
  data: RegisterData;
  year: number;
  selectedIndex: number;
  openRowID: string;
  setOpenRowID: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const { data, year, selectedIndex, openRowID, setOpenRowID } = props;

  const indData = data.indicatorData.flat();

  const registryName = data.registerFullName;
  const dataFlat = getDataSubset(indData, year, selectedIndex);

  return dataFlat.length > 0 ? (
    <React.Fragment>
      <TableHead>
        <TableRow sx={{ backgroundColor: skdeTheme.palette.info.light }}>
          <TableCell colSpan={3} align="left">
            <Typography variant="subtitle2">{registryName}</Typography>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {dataFlat.map((row: IndicatorData) => {
          return (
            <IndicatorRow
              row={row}
              year={year}
              key={"indicator-row-" + row.indicatorID}
              rowID={row.indicatorID}
              openRowID={openRowID}
              setOpenRowID={setOpenRowID}
            />
          );
        })}
      </TableBody>
    </React.Fragment>
  ) : null;
};

type IndicatorRowProps = {
  row: IndicatorData;
  year: number;
  rowID: string;
  openRowID: string;
  setOpenRowID: React.Dispatch<React.SetStateAction<string>>;
};

const IndicatorRow = (props: IndicatorRowProps) => {
  const { row, year, rowID, openRowID, setOpenRowID } = props;

  const lastYear = row.data!.filter((el: DataPoint) => {
    return el.year === year;
  })[0];

  let open: boolean;

  if (openRowID === "") {
    open = false;
  } else if (openRowID === rowID) {
    open = true;
  } else {
    open = false;
  }

  const onClick = () => {
    if (!open) {
      open = true;
      setOpenRowID(rowID);
    } else {
      open = false;
      setOpenRowID("");
    }
  };

  return (
    <React.Fragment>
      <TableRow
        key={row.indicatorID}
        onClick={onClick}
        style={{ cursor: "pointer" }}
      >
        <TableCell>
          <IconButton aria-label="expand" size="small">
            {open ? <ExpandCircleUpOutlined /> : <ExpandCircleDownOutlined />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Typography variant="body1">{row.indicatorTitle}</Typography>
        </TableCell>
        <TableCell>{result(row, lastYear)}</TableCell>
      </TableRow>

      <TableRow
        key={row.indicatorID + "-collapse"}
        sx={{ visibility: open ? "visible" : "collapse" }}
      >
        <TableCell />
        <TableCell colSpan={2}>
          <Stack direction="row" justifyContent="space-evenly">
            {lastYear ? (
              <Stack direction="row">
                <Box sx={{ marginRight: 1 }}>
                  <Typography variant="overline">Dekningsgrad:</Typography>
                </Box>
                <Typography variant="overline">
                  {result(row, lastYear, true)}
                </Typography>
              </Stack>
            ) : null}

            {lastYear ? (
              <ArrowLink
                href={
                  "https://apps.skde.no/behandlingskvalitet/?selected_treatment_units=" +
                  lastYear.unitName +
                  "&selected_row=" +
                  lastYear.indicatorID
                }
                externalLink={true}
                text="Mer om indikatoren"
                textVariant="overline"
              />
            ) : null}
          </Stack>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

type LowLevelIndicatorListProps = {
  context: string;
  unitNames: string[];
  type: string;
  year: number;
};

// Filter out indicators from the registries belonging to the selected medical field
const filterData = (
  data: RegisterData[],
  medfields: Medfield[],
  selectedMedfield: string,
) => {
  if (selectedMedfield === "all") {
    return data;
  }

  const selectedRegisters = medfields.filter(
    (row) => row.shortName === selectedMedfield,
  )[0].registers;

  return data.filter((row) => selectedRegisters.includes(row.registerName));
};

export const LowLevelIndicatorList = (props: LowLevelIndicatorListProps) => {
  const { context, unitNames, type, year } = props;

  const [selectedLevel, setSelectedLevel] = useState<string>("2");
  const [selectedMedfield, setSelectedMedfield] = useState<string>("all");
  const [openRowID, setOpenRowID] = useState<string>("");

  const handleChangeLevel = (event: SelectChangeEvent) => {
    setSelectedLevel(event.target.value);
  };

  const handleChangeMedfield = (event: SelectChangeEvent) => {
    setSelectedMedfield(event.target.value);
  };

  // Get data
  const queryParams: FetchIndicatorParams = {
    context: context,
    unitNames: unitNames,
    type: type,
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const nestedIndicatorQuery: UseQueryResult<any, unknown> = useIndicatorQuery({
    ...queryParams,
    nested: true,
  });

  const medfieldsQuery = useMedicalFieldsQuery();

  if (nestedIndicatorQuery.isFetching || medfieldsQuery.isFetching) {
    return null;
  }

  const data = nestedIndicatorQuery.data as RegisterData[];

  return (
    <>
      <Box sx={{ marginLeft: 3 }}>
        <FormControl sx={{ minWidth: 140, marginRight: 2 }}>
          <InputLabel>Målnivå</InputLabel>
          <Select
            value={selectedLevel}
            label="Målnivå"
            onChange={handleChangeLevel}
          >
            <MenuItem value="0">Høy</MenuItem>
            <MenuItem value="1">Middels</MenuItem>
            <MenuItem value="2">Lav</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Fagområde</InputLabel>
          <Select
            value={selectedMedfield}
            label="Fagområde"
            onChange={handleChangeMedfield}
          >
            <MenuItem value={"all"}>Alle fagområder</MenuItem>
            {medfieldsQuery.data.map((row: Medfield) => {
              return (
                <MenuItem
                  value={row.shortName}
                  key={"lowlevellist-" + row.shortName}
                >
                  {row.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Box>
      <>
        <TableContainer sx={{ overflowX: "clip" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    <b>Indikator</b>
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <b>Resultat</b>
                      <Hoverbox
                        title="Indikatorer viser med prosent og et symbol for måloppnåelse. Som regel er indikatoren beregnet med andel av pasienter som oppfyller kriteriet fra kvalitetsregisteret. Du kan trykke på indikatoren for å få detaljert beskrivelse av indikatoren."
                        placement="top"
                        offset={[20, 20]}
                      >
                        <HelpOutline
                          sx={{
                            color: skdeTheme.palette.primary.main,
                            fontSize: "24px",
                          }}
                        />
                      </Hoverbox>
                    </Stack>
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            {filterData(data, medfieldsQuery.data, selectedMedfield).map(
              (row) => {
                return (
                  <RegistrySection
                    key={row.registerName}
                    data={row}
                    year={year}
                    selectedIndex={Number(selectedLevel)}
                    openRowID={openRowID}
                    setOpenRowID={setOpenRowID}
                  />
                );
              },
            )}
          </Table>
        </TableContainer>
      </>
    </>
  );
};
