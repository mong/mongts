import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import {
  LinechartBase,
  LinechartData,
  font,
  LineStyles,
  lineStyle,
  LinechartBaseProps,
  fetchRegisterNames,
  defaultReviewYear,
  useRegistryRankQuery,
  useRegistryEvaluationQuery,
  RequirementList,
} from "qmongjs";
import { RegistryEvaluation, RegistryRank, RegisterName } from "types";
import { FaCircle } from "react-icons/fa";
import { styled, Box, Tabs, Tab, Stack, Typography } from "@mui/material";
import { Markdown } from "../../src/components/Markdown";

const levelAColour = "#58A55C";
const levelBColour = "#FD9C00";
const levelCColour = "#D85140";
const noLevelColour = "#777777";

const reportYear = defaultReviewYear;

export default function Stadiumfigur({ registry }) {
  // Copy-paste code from https://mui.com/material-ui/react-tabs/
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  // End copy-paste code

  const rankQuery = useRegistryRankQuery();
  const evaluationQuery = useRegistryEvaluationQuery(reportYear);

  const checkList = RequirementList({
    registry: registry,
    year: reportYear,
  });

  if (rankQuery.isFetching || evaluationQuery.isFetching) {
    return null;
  }

  const rankData = rankQuery.data.filter(
    (row: RegistryRank) => row.name === registry,
  );

  const evaluationData = evaluationQuery.data.find(
    (row: RegistryEvaluation) => row.name === registry,
  );

  if (rankData.length === 0) {
    return null;
  }

  type XyData = { x: number; y: string };

  const levelToColour = (level: string) => {
    return level === "A"
      ? levelAColour
      : level === "B"
        ? levelBColour
        : level === "C"
          ? levelCColour
          : noLevelColour;
  };

  const plotData = rankData
    .map((row: RegistryRank) => {
      return { x: row.year, y: row.verdict };
    })
    .sort((a: XyData, b: XyData) => {
      return a.x - b.x;
    })
    .filter((row: XyData) => {
      return row.x <= defaultReviewYear;
    })
    .map((row: XyData) => {
      return {
        x: new Date(row.x, 0),
        y: Number(row.y.substring(0, 1)),
        colour: levelToColour(row.y.substring(1, 2)),
      } as LinechartData;
    });

  const style = {
    text: "test",
    strokeDash: "0",
    colour: "#000000",
  } as lineStyle;

  const font = {
    fontSize: 26,
    fontWeight: 500,
    fontFamily: "Arial",
  } as font;

  const lineStyles = new LineStyles([style], font);

  const yAxisText = { text: "Stadium", font: font };

  const linechartProps = {
    data: [plotData],
    lineStyles: lineStyles,
    width: 1000,
    height: 700,
    yAxisText: yAxisText,
    yMin: 1,
    yMax: 4,
    numYTicks: 4,
    circleRadius: 7,
    individualPointColour: true,
    nGridLines: 3,
    xTicksFont: font,
    yTicksFont: font,
  } as LinechartBaseProps;

  const StyledTypography = styled(Typography)(() => ({
    ...font,
  }));

  const PlotComponent = () => {
    return (
      <div>
        <Stack
          direction="row"
          spacing={2}
          sx={{ marginLeft: 10, marginTop: 10 }}
          alignItems="center"
        >
          <FaCircle style={{ color: levelAColour, fontSize: "1.2rem" }} />
          <StyledTypography>A</StyledTypography>
          <FaCircle style={{ color: levelBColour, fontSize: "1.2rem" }} />
          <StyledTypography>B</StyledTypography>
          <FaCircle style={{ color: levelCColour, fontSize: "1.2rem" }} />
          <StyledTypography>C</StyledTypography>
          <FaCircle style={{ color: noLevelColour, fontSize: "1.2rem" }} />
          <StyledTypography>Ingen nivå</StyledTypography>
        </Stack>
        <LinechartBase {...linechartProps} />
      </div>
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Utvikling over tid" {...a11yProps(0)} />
          <Tab label="Ekspertgruppens vurdering" {...a11yProps(1)} />
          <Tab label="Innfridde krav" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <PlotComponent />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <h2>{"Ekspertgruppens vurdering av årsrapporten for " + reportYear}</h2>
        <Typography style={{ width: "50%" }} variant="body1">
          <Markdown>
            {evaluationData
              ? evaluationData.evaluation_text
              : "Ingen evaluering tilgjengelig"}
          </Markdown>
        </Typography>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        {checkList}
      </CustomTabPanel>
    </Box>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  const registries: RegisterName[] = await fetchRegisterNames();

  const filteredRegistries = registries.find(
    (register) => register.rname === context.params?.registry,
  );

  return {
    props: { registry: filteredRegistries.rname },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const registries: RegisterName[] = await fetchRegisterNames();

  const paths = registries.flatMap((registry: RegisterName) => {
    return [{ params: { registry: registry.rname } }];
  });

  return { paths, fallback: false };
};
