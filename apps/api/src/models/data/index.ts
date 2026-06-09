export * from "./description";
export * from "./indicators";
export { aggData, indTable, medfieldTable, regTable } from "./nestedData";
export { registryEvaluationModel } from "./registryEvaluation";
export { registryRankModel } from "./registryRank";
export { registryRequirementsModel } from "./registryRequirements";
export { registryScoresModel } from "./registryScores";
export * from "./selectionyears";
export * from "./unitNames";

export interface Filter {
  unit_level?: string;
  year?: number;
  unit_name?: string[];
  register?: string;
  type?: string;
  context?: string;
  id?: number;
  ind_id?: string;
}
