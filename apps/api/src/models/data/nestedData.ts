import db from "../../db";
import { Filter } from ".";
import { IndicatorData, Registry, DataPoint } from "types";
import { withFilter } from "./indicators";
import { withIndFilter } from "./description";

export const aggData = (filter?: Filter): Promise<DataPoint[]> =>
  db
    .select(
      "ind_id as indicatorID",
      "unit_name as unitName",
      "year",
      "var",
      "denominator",
      "dg",
      "context",
      "delivery_time as deliveryTime",
      "delivery_latest_affirm as affirmTime",
    )
    .from("agg_data")
    .modify(withFilter, filter);

export const indTable = (filter?: Filter): Promise<IndicatorData[]> =>
  db
    .select(
      "id as indicatorID",
      "title as indicatorTitle",
      "level_green as levelGreen",
      "level_yellow as levelYellow",
      "level_direction as levelDirection",
      "min_denominator as minDenominator",
      "min_value as minValue",
      "max_value as maxValue",
      "short_description as shortDescription",
      "long_description as longDescription",
      "type as indType",
      "name as sortingName",
      "sformat as format",
      "registry_id as registerID",
    )
    .from("ind")
    .where("include", 1)
    .modify(withIndFilter, filter);

export const regTable = (): Promise<Registry[]> =>
  db
    .select(
      "full_name as registerFullName",
      "name as registerName",
      "short_name as registerShortName",
      "id as registerID",
    )
    .from("registry");
