import db from "../../db";
import { ResidentData } from "types";
import { Filter } from ".";

export const residentDataModel = (filter?: Filter): Promise<ResidentData[]> =>
  db
    .select(
      "ind_id AS indicatorID",
      "registry",
      "year",
      "unit_name AS unitName",
      "level",
    )
    .from("vw_resident_data")
    .modify((queryBuilder) => {
      if (filter?.registry) {
        queryBuilder.where("vw_resident_data.registry", filter.registry);
      }
    });
