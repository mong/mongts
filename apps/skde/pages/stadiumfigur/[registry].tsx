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
    width: 1000,
    height: 1000,
    yAxisText: yAxisText,
    yMin: 1,
    yMax: 4,
    numYTicks: 4,
  } as LinechartBaseProps;

  return (
    <div>
      <LinechartBase {...linechartProps} />
    </div>
  );
};

export default Stadiumfigur;
