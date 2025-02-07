import db from "../../db";
import { RegistryEvaluation } from "types";
import { Filter } from ".";

export const registryEvaluationModel = (
  filter?: Filter,
): Promise<RegistryEvaluation[]> =>
  db
    .select(
      "registry.id",
      "registry.name",
      "registry.full_name",
      "registry.short_name",
      "evaluation.year",
      "evaluation.evaluation_text",
    )
    .from("evaluation")
    .modify((queryBuilder) => {
      if (filter?.year) {
        queryBuilder.where("evaluation.year", filter.year);
      }
    })
    .leftJoin("registry", "evaluation.registry_id", "registry.id");
