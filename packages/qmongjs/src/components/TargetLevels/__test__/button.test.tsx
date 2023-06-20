import LEGEND_BTN from "../button";
import { render } from "@testing-library/react";

const dummy_function = (n: string) => {
  n;
};

it("Button renders", async () => {
  const { container } = render(
    <LEGEND_BTN
      level="Høy måloppnåelse"
      legend_btn_class="high"
      update_show_level_filter={dummy_function}
      show_level_filter=""
    />
  );
  expect(container).toMatchSnapshot();
  const { container: another } = render(
    <LEGEND_BTN
      level="Høy måloppnåelse"
      legend_btn_class="high"
      update_show_level_filter={dummy_function}
      show_level_filter="L"
    />
  );
  expect(another).toEqual(container);
});

it("Button renders", async () => {
  const { container } = render(
    <LEGEND_BTN
      level="Høy måloppnåelse"
      legend_btn_class="high"
      update_show_level_filter={dummy_function}
      show_level_filter="H"
    />
  );
  expect(container).toMatchSnapshot();
});

it("Button renders", async () => {
  const { container } = render(
    <LEGEND_BTN
      level="Bla bla bla"
      legend_btn_class="mamma"
      update_show_level_filter={dummy_function}
      show_level_filter="H"
    />
  );
  expect(container).toMatchSnapshot();
});

it("Button renders", async () => {
  const { container } = render(
    <LEGEND_BTN
      level="Bla bla bla"
      legend_btn_class="anna"
      update_show_level_filter={dummy_function}
      show_level_filter="H"
    />
  );
  expect(container).toMatchSnapshot();
});

it("Button renders", async () => {
  const { container } = render(
    <LEGEND_BTN
      level="Bla bla bla"
      legend_btn_class="anna"
      update_show_level_filter={dummy_function}
      show_level_filter="A"
    />
  );
  expect(container).toMatchSnapshot();
});

it("Button renders", async () => {
  const { container } = render(
    <LEGEND_BTN
      level="Bla bla og bla"
      legend_btn_class="likes"
      update_show_level_filter={dummy_function}
      show_level_filter="L"
    />
  );
  expect(container).toMatchSnapshot();
});
