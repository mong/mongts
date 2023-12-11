import { ThemeProvider } from "styled-components";

import IndicatorLinechart, {
  IndicatorLinechartParams,
} from "../../src/charts/IndicatorLinechart";
import { LineStyles, font } from "../../src/charts/LinechartBase";
import { Text } from "@visx/text";

const theme = {
  lineChartBackground: {
    fill: "#000000",
    rx: 25,
    ry: 25,
  },
};

export const Skde = (): JSX.Element => {
  const indicatorParams: IndicatorLinechartParams = {
    unitNames: ["Tromsø"],
    unitLevel: "hospital",
    context: "caregiver",
    type: "ind",
    width: 800,
    height: 400,
    lineStyles: new LineStyles(
      [
        { text: "Høy måloppnåelse", strokeDash: "0", colour: "#3BAA34" },
        { text: "Moderat måloppnåelse", strokeDash: "1 3", colour: "#FD9C00" },
        { text: "Lav måloppnåelse", strokeDash: "8 8", colour: "#E30713" },
      ],
      { fontSize: 11, fontFamily: "Plus Jakarta Sans", fontWeight: 500 },
    ),
    font: {
      fontSize: 12,
      fontWeight: 700,
      fontFamily: "Plus Jakarta Sans",
    },
    startYear: 2016,
    endYear: 2022,
    yMin: 0,
  };

  return (
    <div>
      <div>
        <img
          className="figure"
          alt="Figure"
          src="/img/sykehusprofil/SKDE-innholdsboks1-sykehusprofil.png"
        />
      </div>
      <div>
        <Text
          x={"10%"}
          y={50}
          width={500}
          verticalAnchor="start"
          style={{ fontWeight: 700, fontSize: 24 }}
        >
          Utvikling over tid
        </Text>
      </div>
      <div>
        <ThemeProvider theme={theme}>
          <IndicatorLinechart {...indicatorParams} />
        </ThemeProvider>
      </div>
      <div>
        <img
          className="figure"
          alt="Figure"
          src="/img/sykehusprofil/SKDE-innholdsboks3-sykehusprofil.png"
        />
      </div>
    </div>
  );
};

export default Skde;
