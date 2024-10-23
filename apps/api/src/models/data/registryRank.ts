import db from "../../db";
import { RegistryRank } from "types";
import { Filter } from ".";

export const registryRankModel = (filter?: Filter): Promise<RegistryRank[]> =>
  db
    .select(
      "registry.id",
      "registry.name",
      "registry.full_name",
      "registry.short_name",
      "registry.url",
      "evaluation.verdict",
      "evaluation.year",
    )
    .from("evaluation")
    .modify((queryBuilder) => {
      if (filter?.year) {
        queryBuilder.where("evaluation.year", filter.year);
      }
    })
    .leftJoin("registry", "evaluation.registry_id", "registry.id");
