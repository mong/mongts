import { Knex } from "knex";
import db from "../../db";
import { Filter } from ".";
import { TuName } from "types";

export const distinctUnitNamesRegister = (
  filter: Filter
): Promise<{ unit_name: string }[]> =>
  db
    .from("agg_data")
    .leftJoin("ind", "agg_data.ind_id", "ind.id")
    .where("include", 1)
    .where(function () {
      this.whereRaw("denominator >= min_denominator").orWhereNull(
        "min_denominator"
      );
    })
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
  if (filter?.register === "all") {
    // Only filter out older years and low dg if all registries.
    // Some registries were missing dg data on HF level
    // Some registries were missing data from some units
    // on new data (dg, only data in 2016 and 2021)
    builder
      .where(function () {
        this.where("dg", ">=", 0.7).orWhereNull("dg");
      })
      .where("year", ">=", 2017)
      // Filter out some unwanted hospitals. That is made-up hospitals and
      // hospitals that is only in one register.
      .whereNotIn("orgnr", [100, 300, 800, 900]);
  }
  if (filter?.type) {
    if (filter.type === "dg") {
      builder.whereIn("type", ["dg", "dg_andel", "dg_beregnet_andel"]);
    }
    if (filter.type === "ind") {
      builder.whereNotIn("type", ["dg", "dg_andel", "dg_beregnet_andel"]);
    }
  }
  if (filter?.year && typeof filter?.year === "number") {
    builder.where("year", filter.year);
  }
}

function registerFilter(builder: Knex.QueryBuilder, registerName: string) {
  builder.where("registry_id", function (this: Knex.QueryBuilder) {
    this.select("id").from("registry").where("name", registerName);
  });
}
export const unitNamesAllLevels = (): Promise<TuName[]> =>
  db
    .distinct(
      "hospital.short_name as hospital",
      "hf.short_name as hf",
      "hf.full_name as hf_full",
      "rhf.short_name as rhf"
    )
    .from("hospital")
    .leftJoin("hf", "hospital.hf_orgnr", "hf.orgnr")
    .leftJoin("rhf", "hf.rhf_orgnr", "rhf.orgnr");
