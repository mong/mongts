import db from "../../db";
import { RegistryScores } from "types";
import { Filter } from ".";

export const registryScoresModel = (
  filter?: Filter,
): Promise<RegistryScores[]> =>
  db
    .select(
      "registry.id",
      "registry.name",
      "registry.full_name",
      "registry.short_name",
      "vw_evaluation.year",
      "vw_evaluation.scores",
    )
    .from("vw_evaluation")
    .modify((queryBuilder) => {
      if (filter?.year) {
        queryBuilder.where("vw_evaluation.year", filter.year);
      }
    })
    .leftJoin("registry", "vw_evaluation.registry_id", "registry.id");
