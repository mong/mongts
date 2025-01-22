import { RegistryRequirement, RegistryScores } from "types";
import {
  useRegistryScoresQuery,
  useRegistryRequirementsQuery,
} from "../../helpers/hooks";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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

  const filteredScores = scoresQuery.data.filter((row: RegistryScores) => row.name === registry)[0];

  if (!filteredScores) {
    return null
  }

  const scoresArray = filteredScores.scores.split(",").map((row: string) => Number(row));

  const checkList = requirementsQuery.data.map((row: RegistryRequirement, ind: number) => {
    return(
      {text: row.criteria, approved: ind}
    )
  } )

  console.log(checkList)

  return(
    <>
      <Accordion>
        <AccordionSummary id="stadium2" expandIcon={<ExpandMoreIcon />}>
          Stadium 2
        </AccordionSummary>
        <AccordionDetails>
          Test
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary id="stadium3" expandIcon={<ExpandMoreIcon />}>
          Stadium 3
        </AccordionSummary>
        <AccordionDetails>
          Test
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary id="stadium4" expandIcon={<ExpandMoreIcon />}>
          Stadium 4
        </AccordionSummary>
        <AccordionDetails>
          Test
        </AccordionDetails>
      </Accordion>
    </>
  )
};
