import { Knex } from "knex";
import db from "../../db";
import { Filter } from ".";
import { Indicator } from "types";

export const indicatorsModel = (filter?: Filter): Promise<Indicator[]> =>
  db
    .select("agg_data.*", "ind.type", "ind.include", "ind.min_denominator")
    .from("agg_data")
    .leftJoin("ind", "agg_data.ind_id", "ind.id")
    .where("include", 1)
    .where(function () {
      this.whereRaw("denominator >= min_denominator")
        .orWhereNull("min_denominator")
        .orWhereRaw("type IN ('dg_andel', 'dg_beregnet_andel')");
    })
    .whereNot("unit_name", "LIKE", "Udefinerte%")
    .modify(withFilter, filter);

function withFilter(builder: Knex.QueryBuilder, filter?: Filter) {
  if (filter?.unit_level) {
    builder.andWhere("unit_level", filter.unit_level);
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
  if (filter?.type) {
    if (filter.type === "dg") {
      builder.whereIn("type", ["dg", "dg_andel", "dg_beregnet_andel"]);
    }
    if (filter.type === "ind") {
      builder.whereNotIn("type", ["dg", "dg_andel", "dg_beregnet_andel"]);
    }
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
