import SelectYear from "../.";
import { render, fireEvent, waitFor } from "@testing-library/react";

it("Button renders", async () => {
  const YearArray = Array.from({ length: 5 }, (value, index) => 2000 + index);
  const mockedOnChange = vi.fn();
  const { container, getByText, queryByTestId } = render(
    <SelectYear
      opts={YearArray}
      update_year={mockedOnChange}
      selected_year={YearArray[1]}
    />,
  );
  expect(container).toMatchSnapshot();
  const selectYearComponent = queryByTestId("year_selector");
  expect(selectYearComponent).toBeDefined();
  expect(selectYearComponent).not.toBeNull();
  expect(mockedOnChange).toHaveBeenCalledTimes(0);

  fireEvent.keyDown(selectYearComponent.firstChild, { key: "ArrowDown" });
  await waitFor(() => getByText(YearArray[2]));
  fireEvent.click(getByText(YearArray[2]));

  expect(mockedOnChange).toHaveBeenCalledTimes(1);
  expect(mockedOnChange).toHaveBeenCalledWith(String(YearArray[2]));
  fireEvent.keyDown(selectYearComponent.firstChild, { key: "ArrowUp" });
  fireEvent.keyDown(selectYearComponent.firstChild, { key: "ArrowUp" });
  await waitFor(() => getByText(YearArray[0]));
  fireEvent.click(getByText(YearArray[0]));
  expect(mockedOnChange).toHaveBeenCalledTimes(2);
  expect(mockedOnChange).toHaveBeenCalledWith(String(YearArray[0]));
});
