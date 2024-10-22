import db from "../../db";
import { RegistryRank } from "types";

export const registryRankModel = (): Promise<RegistryRank[]> =>
  db
    .select(
      "registry.id",
      "registry.name",
      "registry.full_name",
      "registry.short_name",
      "evaluation.verdict",
    )
    .from("evaluation")
    .leftJoin("registry", "evaluation.registry_id", "registry.id");
