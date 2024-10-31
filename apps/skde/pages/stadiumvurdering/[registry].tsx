import { GetStaticProps, GetStaticPaths } from "next";
import {
  LinechartBase,
  LinechartData,
  font,
  LineStyles,
  lineStyle,
  LinechartBaseProps,
} from "qmongjs";
import { useRegistryRankQuery } from "qmongjs";
import { RegistryRank } from "types";
import { Stack, Typography } from "@mui/material";
import { FaCircle } from "react-icons/fa";
import { fetchRegisterNames } from "qmongjs";
import { RegisterName } from "types";

const levelAColour = "#58A55C";
const levelBColour = "#FD9C00";
const levelCColour = "#D85140";
const noLevelColour = "#777777";

const Stadiumfigur = ({ registry }) => {
  const rankQuery = useRegistryRankQuery();

  if (rankQuery.isFetching) {
    return null;
  }

  const rankData = rankQuery.data.filter(
    (row: RegistryRank) => row.name === registry,
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
    fontSize: 18,
    fontWeight: 500,
    fontFamily: "Arial",
  } as font;

  const lineStyles = new LineStyles([style], font);

  const yAxisText = { text: "Stadium", font: font };

  const linechartProps = {
    data: [plotData],
    lineStyles: lineStyles,
    width: 800,
    height: 600,
    yAxisText: yAxisText,
    yMin: 1,
    yMax: 4,
    numYTicks: 4,
    circleRadius: 7,
    individualPointColour: true,
    nGridLines: 3,
  } as LinechartBaseProps;

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ marginLeft: 10, marginTop: 10 }}>
        <FaCircle style={{ color: levelAColour, fontSize: "1.2rem" }} />
        <Typography>A</Typography>
        <FaCircle style={{ color: levelBColour, fontSize: "1.2rem" }} />
        <Typography>B</Typography>
        <FaCircle style={{ color: levelCColour, fontSize: "1.2rem" }} />
        <Typography>C</Typography>
        <FaCircle style={{ color: noLevelColour, fontSize: "1.2rem" }} />
        <Typography>Ingen nivå</Typography>
      </Stack>
      <LinechartBase {...linechartProps} />
    </div>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const registries: RegisterName[] = await fetchRegisterNames();

  const filteredRegistries = registries.filter(
    (register) => register.rname === context.params?.registry,
  );

  return {
    props: { registry: filteredRegistries[0].rname },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const registries: RegisterName[] = await fetchRegisterNames();

  const paths = registries.flatMap((registry: RegisterName) => {
    return [{ params: { registry: registry.rname } }];
  });

  return { paths, fallback: false };
};

export default Stadiumfigur;
