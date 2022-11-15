import { render } from "@testing-library/react";

import { IndicatorValue } from "../";
import national_data from "../../../../test/test_data/national_data";

it("renders", () => {
  const data = national_data[1];

  const { container } = render(
    <table>
      <tbody>
        <tr>
          <IndicatorValue indicatorData={data} />
        </tr>
      </tbody>
    </table>
  );
  expect(container).toMatchSnapshot();
});

it("renders beregnet_andel", () => {
  const data = { ...national_data[1], type: "beregnet_andel" };
  const { container } = render(
    <table>
      <tbody>
        <tr>
          <IndicatorValue indicatorData={data} />
        </tr>
      </tbody>
    </table>
  );
  expect(container).toMatchSnapshot();
});
