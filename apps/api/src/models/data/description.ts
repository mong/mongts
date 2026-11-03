import type { Knex } from "knex";
import type { Description } from "types";
import db from "../../db";
import type { Filter } from ".";

export const descriptionModel = (
  register: string,
  filter: Filter | undefined,
): Promise<Description[]> =>
  db
    .select("ind.*", "registry.name as rname", "registry.full_name")
    .from("ind")
    .leftJoin("registry", "ind.registry_id", "registry.id")
    .where("registry_id", function (this: Knex) {
      this.select("id").from("registry").where("name", register);
    })
    .modify(withFilter, filter);

function withFilter(builder: Knex.QueryBuilder, filter?: Filter) {
  if (filter?.type) {
    if (filter.type === "dg") {
      builder.where("type", "dg_andel").orWhereNull("type");
    } else if (filter.type === "ind") {
      builder.whereNot("type", "dg_andel").whereNotNull("type");
    }
  }
}
