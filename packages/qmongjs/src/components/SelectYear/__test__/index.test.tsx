import SelectYear from "../.";
import { render, fireEvent, waitFor } from "@testing-library/react";

it("Button renders", async () => {
  const mockedOnChange = vi.fn();
  const { container, getByText, queryByTestId } = render(
    <SelectYear
      opts={[2000, 2001, 2002]}
      update_year={mockedOnChange}
      selected_year={2001}
    />,
  );
  expect(container).toMatchSnapshot();
  const selectYearComponent = queryByTestId("year_selector");
  expect(selectYearComponent).toBeDefined();
  expect(selectYearComponent).not.toBeNull();
  expect(mockedOnChange).toHaveBeenCalledTimes(0);

  fireEvent.keyDown(selectYearComponent.firstChild, { key: "ArrowDown" });
  await waitFor(() => getByText("2002"));
  fireEvent.click(getByText("2002"));

  expect(mockedOnChange).toHaveBeenCalledTimes(1);
  expect(mockedOnChange).toHaveBeenCalledWith("2002");
  fireEvent.keyDown(selectYearComponent.firstChild, { key: "ArrowUp" });
  fireEvent.keyDown(selectYearComponent.firstChild, { key: "ArrowUp" });
  await waitFor(() => getByText("2000"));
  fireEvent.click(getByText("2000"));
  expect(mockedOnChange).toHaveBeenCalledTimes(2);
  expect(mockedOnChange).toHaveBeenCalledWith("2000");
});
