import { Knex } from "knex";
import db from "../../db";
import { Filter } from ".";
import { Indicator } from "types";

export const indicatorsModel = (filter?: Filter): Promise<Indicator[]> =>
  db
    .select(
      "agg_data.id",
      "agg_data.ind_id",
      "agg_data.unit_level",
      "agg_data.unit_name",
      "agg_data.context",
      "agg_data.year",
      "agg_data.denominator",
      "agg_data.var",
      "agg_data.dg",
      "agg_data.delivery_time",
      "agg_data.delivery_latest_update",
      "agg_data.delivery_latest_affirm",
      "ind.type",
      "ind.include",
      "ind.min_denominator",
      "ind.level_direction",
      "ind.level_green",
      "ind.level_yellow",
      "ind.sformat",
      "registry.id as registry_id",
      "registry.name as registry_name",
      "registry.full_name as registry_full_name",
      "medfield.id as medfield_id",
      "medfield.name as medfield_name",
      "medfield.full_name as medfield_full_name",
      "ind.short_description",
      "ind.long_description",
      "ind.title",
      "ind.name",
    )
    .from("agg_data")
    .leftJoin("ind", "agg_data.ind_id", "ind.id")
    .leftJoin("registry", "ind.registry_id", "registry.id")
    .leftJoin(
      "registry_medfield",
      "registry.id",
      "registry_medfield.registry_id",
    )
    .leftJoin("medfield", "registry_medfield.medfield_id", "medfield.id")
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
