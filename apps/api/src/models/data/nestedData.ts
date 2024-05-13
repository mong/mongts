import db from "../../db";
import { Filter } from ".";
import { RegisterData } from "types";
import { withFilter } from "./indicators";

export const nestedDataModel = (filter?: Filter): Promise<RegisterData[]> => {
  const returnvalue = db
    .select("year")
    .from("agg_data")
    .modify(withFilter, filter);

  return returnvalue;
};
