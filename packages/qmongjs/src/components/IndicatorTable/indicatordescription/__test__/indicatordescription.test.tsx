import { render } from "@testing-library/react";

import { IndicatorDescription } from "../";
import description from "../../../../test/test_data/description";

it("renders without defined green level", () => {
  const desc = description[0];
  const { container } = render(
    <table>
      <tbody>
        <tr>
          <IndicatorDescription description={desc} />
        </tr>
      </tbody>
    </table>,
  );
  expect(container).toMatchSnapshot();
});

it("renders with defined green level", () => {
  const desc = description[1];
  const { container } = render(
    <table>
      <tbody>
        <tr>
          <IndicatorDescription description={desc} />
        </tr>
      </tbody>
    </table>,
  );
  expect(container).toMatchSnapshot();
});

it("renders with non-complete year", () => {
  const desc = description[1];
  const { container } = render(
    <table>
      <tbody>
        <tr>
          <IndicatorDescription description={desc} lastCompleteYear={1979} />
        </tr>
      </tbody>
    </table>,
  );
  expect(container).toMatchSnapshot();
});
