import { Knex } from "knex";
import db from "../../db";
import { Filter } from ".";
import { IndicatorData, Registry, DataPoint } from "types";

export const aggData = (filter?: Filter): Promise<DataPoint[]> =>
  db
    .select(
      "id",
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
    .modify(withDataFilter, filter);

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

export const regTable = (filter?: Filter): Promise<Registry[]> =>
  db
    .select(
      "full_name as registerFullName",
      "name as registerName",
      "short_name as registerShortName",
      "id as registerID",
    )
    .from("registry")
    .modify(withRegFilter, filter);

function withRegFilter(builder: Knex.QueryBuilder, filter?: Filter) {
  if (filter?.register) {
    builder.where("name", filter.register);
  }
}

function withIndFilter(builder: Knex.QueryBuilder, filter?: Filter) {
  if (filter?.type) {
    if (filter.type === "dg") {
      builder.whereIn("type", ["dg", "dg_andel"]);
    }
    if (filter.type === "ind") {
      builder.whereNotIn("type", ["dg", "dg_andel"]);
    }
  }
  if (filter?.ind_id) {
    builder.where("id", filter.ind_id);
  }
  if (filter?.register) {
    builder.whereIn("registry_id", function (this: Knex.QueryBuilder) {
      this.select("registry.id")
        .from("registry")
        .modify(registerFilter, filter.register ?? "");
    });
  }
}

function withDataFilter(builder: Knex.QueryBuilder, filter?: Filter) {
  if (filter?.id) {
    builder.where("id", filter.id);
  }
  if (filter?.year && typeof filter?.year === "number") {
    builder.where("year", filter.year);
  }
  if (filter?.unit_name) {
    builder.whereIn("unit_name", filter.unit_name);
  }
  if (filter?.context) {
    builder.where("context", filter.context);
  }
  if (filter?.register) {
    builder.whereIn("ind_id", function (this: Knex.QueryBuilder) {
      this.select("ind.id")
        .from("ind")
        .modify(registerFilter, filter.register ?? "");
    });
  }
}

function registerFilter(builder: Knex.QueryBuilder, registerName: string) {
  builder.where("registry_id", function (this: Knex.QueryBuilder) {
    this.select("id").from("registry").where("name", registerName);
  });
}

export const medfieldTable = () => {
  const medfields = db
    .select("medfield_id", "registry_id")
    .from("registry_medfield");
  return medfields;
};
