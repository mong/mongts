const sharedFields = {
  nordic: 1,
  unit_level: "nation",
  context: "caregiver",
  dg: 1,
  delivery_time: "2026-08-28T10:32:40.000Z",
  delivery_latest_update: "2026-08-28T00:00:00.000Z",
  delivery_latest_affirm: "2026-01-01T00:00:00.000Z",
  type: "beregnet_andel",
  include: 1,
  min_denominator: null,
  sformat: ",.0%",
  registry_id: 101,
  registry_name: "ryggmargsskade",
  registry_full_name: "Nasjonalt kvalitetsregister for ryggmargsskade",
  registry_short_name: "Ryggmargsskade",
  medfield_id: 10,
  medfield_name: "rehabilitering",
  medfield_full_name: "Rehabilitering",
};

const years = [2022, 2023, 2024, 2025, 2026] as const;

const countries = ["norge", "sverige", "danmark", "finland"] as const;

const clamp = (value: number, minimum: number, maximum: number) => {
  return Math.min(maximum, Math.max(minimum, value));
};

const indicatorSpecs = [
  {
    ind_id: "a_nevrologisk_klassifikasjon",
    ind_title: "Nevrologisk klassifikasjon ved innkomst og utreise",
    level_direction: 1,
    level_green: 0.95,
    level_yellow: 0.81,
    base: 0.84,
    yearStep: 0.015,
    countryStep: 0.015,
    denominatorBase: 72,
  },
  {
    ind_id: "b_sykehjem_andel",
    ind_title: "Lavest mulig andel pasienter skrevet ut til sykehjem",
    level_direction: 0,
    level_green: 0.1,
    level_yellow: 0.19,
    base: 0.2,
    yearStep: -0.01,
    countryStep: 0.008,
    denominatorBase: 58,
  },
  {
    ind_id: "c_blaerefunksjon_kartlagt",
    ind_title: "Andel pasienter som har fått kartlagt og vurdert blærefunksjon",
    level_direction: 1,
    level_green: 0.95,
    level_yellow: 0.86,
    base: 0.87,
    yearStep: 0.01,
    countryStep: 0.015,
    denominatorBase: 76,
  },
  {
    ind_id: "d_blaeretomming_regime",
    ind_title:
      "Blæretømmingsregime for pasienter med paraplegitilstand (subgruppe av registerpopulasjon)",
    level_direction: 1,
    level_green: 0.8,
    level_yellow: 0.56,
    base: 0.58,
    yearStep: 0.03,
    countryStep: 0.025,
    denominatorBase: 49,
  },
  {
    ind_id: "e_tarmfunksjon_kartlagt",
    ind_title: "Andel pasienter som har fått kartlagt og vurdert tarmfunksjon",
    level_direction: 1,
    level_green: 0.95,
    level_yellow: 0.86,
    base: 0.88,
    yearStep: 0.01,
    countryStep: 0.01,
    denominatorBase: 80,
  },
  {
    ind_id: "f_prom_livskvalitet",
    ind_title:
      "Andel pasienter med selvrapportert livskvalitet (PROM) under primæropphold",
    level_direction: 1,
    level_green: 0.85,
    level_yellow: 0.56,
    base: 0.57,
    yearStep: 0.03,
    countryStep: 0.02,
    denominatorBase: 54,
  },
] as const;

export const testData = indicatorSpecs.flatMap((indicator, indicatorIndex) =>
  years.flatMap((year, yearIndex) =>
    countries.map((unit_name, countryIndex) => {
      const rawValue =
        indicator.base +
        yearIndex * indicator.yearStep +
        countryIndex * indicator.countryStep;

      const boundedValue =
        indicator.level_direction === 0
          ? clamp(rawValue, 0.08, 0.24)
          : clamp(rawValue, 0.05, 0.95);

      const denominator =
        indicator.denominatorBase +
        yearIndex * 3 +
        countryIndex * 4 +
        indicatorIndex;

      return {
        ...sharedFields,
        id: 8100000 + indicatorIndex * 100 + yearIndex * 10 + countryIndex + 1,
        ind_id: indicator.ind_id,
        unit_name,
        year,
        denominator,
        var: Number(boundedValue.toFixed(2)),
        level_direction: indicator.level_direction,
        level_green: indicator.level_green,
        level_yellow: indicator.level_yellow,
        ind_title: indicator.ind_title,
      };
    }),
  ),
);
