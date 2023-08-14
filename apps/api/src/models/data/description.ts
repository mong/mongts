import { Knex } from "knex";
import db from "../../db";
import { Filter } from ".";
import { Description } from "types";

export const descriptionModel = (
  register: string,
  filter: Filter | undefined,
): Promise<Description[]> =>
  db
    .select("ind.*", "registry.name as rname", "registry.full_name")
    .from("ind")
    .leftJoin("registry", "ind.registry_id", "registry.id")
    .modify(withFilter, filter)
    .where("registry_id", function (this: Knex) {
      this.select("id").from("registry").where("name", register);
    });

function withFilter(builder: Knex.QueryBuilder, filter?: Filter) {
  if (filter?.type) {
    if (filter.type === "dg") {
      builder.where("type", filter.type).orWhereNull("type");
    } else if (filter.type === "ind") {
      builder.whereNot("type", "dg").whereNotNull("type");
    }
  }
}
