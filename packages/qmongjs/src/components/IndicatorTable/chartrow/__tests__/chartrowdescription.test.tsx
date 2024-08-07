import { ChartRowDescription } from "../chartrowdescription";
import { render } from "@testing-library/react";
import { test, expect } from "vitest";

test("ChartRowDescription where date will change with time zone", () => {
  const delivery_time = new Date("1999-12-31T23:59:59.999Z");
  const { container } = render(
    <ChartRowDescription
      description_text="Denne kvalitetsindikatoren er definert som andel pasienter med..."
      delivery_time={delivery_time}
    />,
  );

  expect(container).toMatchSnapshot();
});

test("ChartRowDescription with date equals zero and Norwegian characters", () => {
  const delivery_time = new Date(0);
  const { container } = render(
    <ChartRowDescription
      description_text="Vi prøver ågså særnårske bokstaver"
      delivery_time={delivery_time}
    />,
  );

  expect(container).toMatchSnapshot();
});

test("ChartRowDescription with non-default title and +02:00 time zone", () => {
  const delivery_time = new Date("1979-03-10T23:59:59.000+02:00");
  const { container } = render(
    <ChartRowDescription
      description_text="Denne kvalitetsindikatoren er definert som andel pasienter med..."
      delivery_time={delivery_time}
      description_title="Dette er en annen tittel"
    />,
  );

  expect(container).toMatchSnapshot();
});

test("ChartRowDescription with some markdown", () => {
  const delivery_time = new Date("1979-03-10T23:59:59.000+02:00");
  const { container } = render(
    <ChartRowDescription
      description_text="Litt tekst *som er kursiv* og **og fet**. Legge inn en [lenke](https://www.nrk.no/) her.
      
      Til og med bilde
      
      ![and](https://loremflickr.com/320/240)
      
      Prøve med fotnote[^1].
      
      [^1]: Som står her."
      delivery_time={delivery_time}
      description_title="Dette er en annen tittel"
    />,
  );

  expect(container).toMatchSnapshot();
});
