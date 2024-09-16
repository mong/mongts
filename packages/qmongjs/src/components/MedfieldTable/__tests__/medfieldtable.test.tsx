import React from "react";
import { MedfieldTable, createMedfieldTableData } from "..";
import { vi, test, expect } from "vitest";
import * as hooks from "../../../helpers/hooks";
import { render } from "@testing-library/react";
import { vi } from "vitest";
import { Indicator } from "types";

const medfieldTableData: Indicator[] = [
  {
    // Green
    ind_id: "hjerte_ind1",
    unit_level: "hospital",
    unit_name: "Tromsø",
    context: "caregiver",
    year: 2022,
    denominator: 112,
    var: 0.95,
    dg: 0.95,
    type: "andel",
    include: 1,
    min_denominator: 10,
    level_direction: 1,
    level_green: 0.9,
    level_yellow: 0.85,
    sformat: ",.0%",
    registry_id: 1,
    registry_name: "hjertereg1",
    registry_full_name: "Hjerteregister nummer 1",
    registry_short_name: "Hjerteregister 1",
    medfield_id: 1,
    medfield_name: "hjerte",
    medfield_full_name: "Hjerte- og karsykdommer",
    ind_title: "Tittel til indikator nr. 1 for hjerte- og karsykdommer",
  },
  {
    // Red
    ind_id: "hjerte_ind2",
    unit_level: "hospital",
    unit_name: "Tromsø",
    context: "caregiver",
    year: 2022,
    denominator: 15,
    var: 0.85,
    dg: 0.95,
    type: "andel",
    include: 1,
    min_denominator: 10,
    level_direction: 1,
    level_green: 0.95,
    level_yellow: 0.9,
    sformat: ",.0%",
    registry_id: 2,
    registry_name: "hjertereg2",
    registry_full_name: "Hjerteregister nummer 2",
    registry_short_name: "Hjerteregister 2",
    medfield_id: 1,
    medfield_name: "hjerte",
    medfield_full_name: "Hjerte- og karsykdommer",
    ind_title: "Tittel til indikator nr. 2 for hjerte- og karsykdommer",
  },
  {
    // Yellow
    ind_id: "diabetes_ind1",
    unit_level: "hospital",
    unit_name: "Tromsø",
    context: "caregiver",
    year: 2022,
    denominator: 54,
    var: 0.55,
    dg: null,
    type: "andel",
    include: 1,
    min_denominator: null,
    level_direction: 1,
    level_green: 0.6,
    level_yellow: 0.4,
    sformat: ",.0%",
    registry_id: 3,
    registry_name: "diabetesreg1",
    registry_full_name: "Diabetesregister nummer 1",
    registry_short_name: "Diabetesregister 1",
    medfield_id: 3,
    medfield_name: "diabetes",
    medfield_full_name: "Diabetes",
    ind_title: "Tittel til indikator nr. 1 for diabetes",
  },
  {
    // Green
    ind_id: "diabetes_ind2",
    unit_level: "hospital",
    unit_name: "Tromsø",
    context: "caregiver",
    year: 2022,
    denominator: 48,
    var: 0.65,
    dg: 0.95,
    type: "andel",
    include: 1,
    min_denominator: null,
    level_direction: 1,
    level_green: 0.6,
    level_yellow: 0.4,
    sformat: ",.0%",
    registry_id: 3,
    registry_name: "diabetesreg1",
    registry_full_name: "Diabetesregister nummer 1",
    registry_short_name: "Diabetesregister 1",
    medfield_id: 3,
    medfield_name: "diabetes",
    medfield_full_name: "Diabetes",
    ind_title: "Tittel til indikator nr. 2 for diabetes",
  },
  {
    // Green
    ind_id: "barn_ind1",
    unit_level: "hospital",
    unit_name: "Tromsø",
    context: "caregiver",
    year: 2022,
    denominator: 83,
    var: 0.45,
    dg: 0.95,
    type: "andel",
    include: 1,
    min_denominator: null,
    level_direction: 1,
    level_green: 0.4,
    level_yellow: 0.2,
    sformat: ",.0%",
    registry_id: 4,
    registry_name: "barnereg1",
    registry_full_name: "Barneregister nummer 1",
    registry_short_name: "Barneregister 1",
    medfield_id: 5,
    medfield_name: "barn",
    medfield_full_name: "Barn",
    ind_title: "Tittel til indikator nr. 1 for barn",
  },
  {
    // Green
    ind_id: "barn_ind2",
    unit_level: "hospital",
    unit_name: "Tromsø",
    context: "caregiver",
    year: 2022,
    denominator: 86,
    var: 0.45,
    dg: 0.95,
    type: "andel",
    include: 1,
    min_denominator: null,
    level_direction: 1,
    level_green: 0.4,
    level_yellow: 0.2,
    sformat: ",.0%",
    registry_id: 5,
    registry_name: "barnereg2",
    registry_full_name: "Barneregister nummer 2",
    registry_short_name: "Barneregister 2",
    medfield_id: 5,
    medfield_name: "barn",
    medfield_full_name: "Barn",
    ind_title: "Tittel til indikator nr. 2 for barn",
  },
  {
    // Green
    ind_id: "barn_ind3",
    unit_level: "hospital",
    unit_name: "Tromsø",
    context: "caregiver",
    year: 2022,
    denominator: 86,
    var: 0.45,
    dg: 0.95,
    type: "andel",
    include: 1,
    min_denominator: null,
    level_direction: 1,
    level_green: 0.4,
    level_yellow: 0.2,
    sformat: ",.0%",
    registry_id: 5,
    registry_name: "barnereg2",
    registry_full_name: "Barneregister nummer 2",
    registry_short_name: "Barneregister 2",
    medfield_id: 5,
    medfield_name: "barn",
    medfield_full_name: "Barn",
    ind_title: "Tittel til indikator nr. 3 for barn",
  },
];

vi.mock("next/font/google", () => ({
  Plus_Jakarta_Sans: () => ({
    weight: ["200", "300", "400", "500", "600", "700", "800"],
    subsets: ["latin"],
    display: "swap",
    style: {
      fontFamily: "Plus Jakarta Sans",
    },
  }),
}));

const data = createMedfieldTableData(medfieldTableData);

test("Levels counts are correct", () => {
  expect(data).toMatchSnapshot();
});

test("Table renders correctly", async () => {
  vi.spyOn(hooks, "useIndicatorQuery").mockReturnValue({
    data: medfieldTableData,
    isLoading: false,
    error: false,
  });

  const { container } = render(
    <MedfieldTable
      unitNames={["Tromsø"]}
      treatmentYear={2022}
      context={"caregiver"}
      type={"ind"}
    />,
  );

  expect(container).toMatchSnapshot();
});
