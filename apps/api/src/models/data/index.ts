export * from "./unitNames";
export * from "./indicators";
export * from "./description";
export * from "./selectionyears";
export { registryRankModel } from "./registryRank";
export { registryEvaluationModel } from "./registryEvaluation";
export { registryScoresModel } from "./registryScores";
export { aggData, indTable, regTable, medfieldTable } from "./nestedData";

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
