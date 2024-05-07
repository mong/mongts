import { Indicator, RegisterData } from "types";

export const nestedData = (flatdata: Indicator[]): RegisterData[] => {
  const mydata = flatdata.reduce((acc, cur) => {
    if (
      acc.length === 0 ||
      acc.every((tu_entry) => tu_entry.registerID !== cur.registry_id)
    ) {
      const entry = {
        registerFullName: cur.registry_full_name,
        registerName: cur.registry_name,
        registerShortName: cur.registry_short_name,
        registerID: cur.registry_id,
        medfieldID: [cur.medfield_id],
        indicatorData: [
          {
            indicatorID: cur.ind_id,
            indicatorTitle: cur.ind_title,
            levelGreen: cur.level_green,
            levelYellow: cur.level_yellow,
            levelDirection: cur.level_direction,
            minDenominator: cur.min_denominator,
            shortDescription: cur.ind_short_description,
            longDescription: cur.ind_long_description,
            indType: cur.type,
            sortingName: cur.ind_name,
            format: cur.sformat,
            data: [
              {
                unitName: cur.unit_name,
                year: cur.year,
                var: cur.var,
                denominator: cur.denominator,
                dg: cur.dg,
                context: cur.context,
                deliveryTime: cur.delivery_time,
                affirmTime: cur.delivery_latest_affirm,
              },
            ],
          },
        ],
      };
      acc = [...acc, entry];
    }
    return acc;
  }, [] as RegisterData[]);

  return mydata;
};
