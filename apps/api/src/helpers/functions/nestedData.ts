import { Indicator, RegisterData } from "types";

export const nestedData = (flatdata: Indicator[]): RegisterData[] => {
  /* Sort flat data */
  flatdata
    .sort((a, b) => {
      return a.year > b.year ? 1 : a.year < b.year ? -1 : 0;
    })
    .sort((a, b) => {
      return a.context > b.context ? 1 : a.context < b.context ? -1 : 0;
    })
    .sort((a, b) => {
      return a.unit_name > b.unit_name ? 1 : a.unit_name < b.unit_name ? -1 : 0;
    })
    .sort((a, b) => {
      return a.medfield_id > b.medfield_id
        ? 1
        : a.medfield_id < b.medfield_id
          ? -1
          : 0;
    })
    .sort((a, b) => {
      return a.ind_id > b.ind_id ? 1 : a.ind_id < b.ind_id ? -1 : 0;
    })
    .sort((a, b) => {
      return a.registry_id > b.registry_id
        ? 1
        : a.registry_id < b.registry_id
          ? -1
          : 0;
    });

  let medfields: number[] = [];
  /* Create nested data */
  const mydata = flatdata.reduce((acc, cur, index, all) => {
    // First entry overall or first entry of a registry
    if (
      acc.length === 0 ||
      acc.every((curr_entry) => curr_entry.registerID !== cur.registry_id)
    ) {
      // redefine array of medical fields for given registry
      medfields = [cur.medfield_id];
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
                id: cur.id,
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
    } else {
      // Not add data if id is equal the previous id (same data but different medical field)
      if (all[index - 1].id === cur.id) {
        // only include extra medical fields
        if (!medfields.includes(cur.medfield_id)) {
          medfields = [...medfields, cur.medfield_id];
          acc
            .filter((acc_data) => acc_data.registerID === cur.registry_id)[0]
            .medfieldID.push(cur.medfield_id);
        }
      } else {
        // add next indicator if not the same as previous one
        if (all[index - 1].ind_id !== cur.ind_id) {
          acc
            .filter((acc_data) => acc_data.registerID === cur.registry_id)[0]
            .indicatorData.push({
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
                  id: cur.id,
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
            });
        } else {
          try {
            acc.filter((acc_data) =>
              acc_data.indicatorData
                .filter((deep) => deep.indicatorID === cur.ind_id)[0]
                .data.push({
                  id: cur.id,
                  unitName: cur.unit_name,
                  year: cur.year,
                  var: cur.var,
                  denominator: cur.denominator,
                  dg: cur.dg,
                  context: cur.context,
                  deliveryTime: cur.delivery_time,
                  affirmTime: cur.delivery_latest_affirm,
                }),
            );
          } catch (error) {
            console.log("FORRIGE");

            console.log(all[index - 1]);

            console.log("DENNE");

            console.log(cur);
          }
        }
      }
    }
    return acc;
  }, [] as RegisterData[]);

  return mydata;
};
