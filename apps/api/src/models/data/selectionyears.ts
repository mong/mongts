import { Knex } from "knex";
import db from "../../db";
import { Filter } from ".";

export const selectionYearsModel = (
  filter: Filter
): Promise<{ year: string }[]> =>
  db
    .distinct("agg_data.year")
    .from("agg_data")
    .leftJoin("ind", "agg_data.ind_id", "ind.id")
    .where("include", 1)
    .whereNot("unit_name", "LIKE", "Udefinerte%")
    .where("context", filter.context ?? "")
    .modify(withFilter, filter);

function withFilter(builder: Knex.QueryBuilder, filter?: Filter) {
  if (filter?.register && filter?.register !== "all") {
    builder.whereIn("ind_id", function (this: Knex.QueryBuilder) {
      this.select("ind.id")
        .from("ind")
        .modify(registerFilter, filter.register ?? "");
    });
  }
  if (filter?.type) {
    if (filter.type === "dg") {
      builder.whereIn("type", ["dg", "dg_andel", "dg_beregnet_andel"]);
    }
    if (filter.type === "ind") {
      builder.whereNotIn("type", ["dg", "dg_andel", "dg_beregnet_andel"]);
    }
  }
}

function registerFilter(builder: Knex.QueryBuilder, registerName: string) {
  builder.where("registry_id", function (this: Knex.QueryBuilder) {
    this.select("id").from("registry").where("name", registerName);
  });
}
