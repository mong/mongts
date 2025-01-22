import {
  useRegistryRankQuery,
  useRegistryScoresQuery,
  useRegistryRequirementsQuery,
} from "../../helpers/hooks";

type RequirementListProps = {
  registry: string;
  year: number;
};

export const RequirementList = (props: RequirementListProps) => {
  const { registry, year } = props;

  const requirementsQuery = useRegistryRequirementsQuery();
  const scoresQuery = useRegistryScoresQuery(year);

  if (requirementsQuery.isFetching || scoresQuery.isFetching) {
    return null;
  }

  return null;
};
