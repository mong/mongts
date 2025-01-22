import db from "../../db";
import { RegistryRequirement } from "types";

export const registryRequirementsModel = (): Promise<RegistryRequirement[]> =>
  db
    .select(
      "requirements.stage_or_level",
      "requirements.criteria",
      "requirements.guide",
      "requirements.section",
      "requirements.introduction_year",
      "requirements.last_year",
    )
    .from("requirements");
