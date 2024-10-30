import { useRouter } from "next/router";
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

const Stadiumfigur = () => {
  const router = useRouter();
  const { registry } = router.query;

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
      ? "#3BAA34"
      : level === "B"
        ? "#FD9C00"
        : level === "C"
          ? "#E30713"
          : "#777777";
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
  } as LinechartBaseProps;

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ marginLeft: 10, marginTop: 10 }}>
        <FaCircle style={{ color: "#58A55C", fontSize: "1.2rem" }} />
        <Typography>A</Typography>
        <FaCircle style={{ color: "#FD9C00", fontSize: "1.2rem" }} />
        <Typography>B</Typography>
        <FaCircle style={{ color: "#D85140", fontSize: "1.2rem" }} />
        <Typography>C</Typography>
        <FaCircle style={{ color: "#777777", fontSize: "1.2rem" }} />
        <Typography>Ingen nivå</Typography>
      </Stack>
      <LinechartBase {...linechartProps} />
    </div>
  );
};

export default Stadiumfigur;
