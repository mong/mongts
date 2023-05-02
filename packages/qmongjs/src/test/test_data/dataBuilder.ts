import { Indicator, Description } from "types";

export function buildIndicator(overrides: Partial<Indicator>): Indicator {
  return {
    year: Math.floor(
      Math.random() * 6 + 2015
    ) /* Random year between 2015 and 2020 */,
    id: Math.floor(Math.random() * 1000),
    ind_id: "testdata",
    unit_level: "nation",
    unit_name: "Nasjonalt",
    min_denominator: 5,
    denominator: 42,
    var: Math.random(),
    context: "caregiver",
    level_direction: null,
    level_green: null,
    level_yellow: null,
    sformat: ",.0%",
    dg: null,
    include: 1,
    type: "andel",
    delivery_latest_update: new Date("October 13, 2014 11:13:00"),
    delivery_latest_affirm: new Date("October 13, 2019 11:13:00"),
    ...overrides,
  };
}

export function buildDescription(overrides: Partial<Description>): Description {
  return {
    id: "testdata",
    dg_id: null,
    include: 1,
    title: null,
    name: null,
    type: null,
    sformat: ",.0%",
    measure_unit: null,
    min_denominator: 5,
    min_value: null,
    max_value: null,
    level_green: null,
    level_yellow: null,
    level_direction: null,
    short_description: null,
    long_description: null,
    registry_id: 99,
    rname: null,
    full_name: "Norsk medisinsk kvalitetsregister for test",
    ...overrides,
  };
}
