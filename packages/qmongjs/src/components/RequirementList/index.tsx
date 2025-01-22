import { RegistryRequirement, RegistryScores } from "types";
import {
  useRegistryScoresQuery,
  useRegistryRequirementsQuery,
} from "../../helpers/hooks";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

type RequirementListProps = {
  registry: string;
  year: number;
};

type CheckList = {
  text: string;
  approved: number;
  stageOrLevel: string;
};

const mapCheckList = (row: CheckList, stageOrLevel: string) => {
  if (row.stageOrLevel !== stageOrLevel) {
    return null;
  }

  const icon =
    row.approved === 1 ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />;
  const line = (
    <Stack direction="row">
      {icon}
      <Typography>{row.text}</Typography>
    </Stack>
  );

  return line;
};
export const RequirementList = (props: RequirementListProps) => {
  const { registry, year } = props;

  const requirementsQuery = useRegistryRequirementsQuery();
  const scoresQuery = useRegistryScoresQuery(year);

  if (requirementsQuery.isFetching || scoresQuery.isFetching) {
    return null;
  }

  const filteredScores = scoresQuery.data.filter(
    (row: RegistryScores) => row.name === registry,
  )[0];

  if (!filteredScores) {
    return null;
  }

  const scoresArray = filteredScores.scores
    .split(",")
    .map((row: string) => Number(row));

  const checkList = requirementsQuery.data.map(
    (row: RegistryRequirement, ind: number) => {
      return {
        text: row.criteria,
        approved: scoresArray[ind],
        stageOrLevel: row.stage_or_level,
      };
    },
  );

  return (
    <>
      <Accordion>
        <AccordionSummary id="stadium2" expandIcon={<ExpandMoreIcon />}>
          Stadium 2
        </AccordionSummary>
        <AccordionDetails>
          {checkList.map((row: CheckList) => mapCheckList(row, "2"))}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary id="stadium3" expandIcon={<ExpandMoreIcon />}>
          Stadium 3
        </AccordionSummary>
        <AccordionDetails>
          {checkList.map((row: CheckList) => mapCheckList(row, "3"))}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary id="stadium4" expandIcon={<ExpandMoreIcon />}>
          Stadium 4
        </AccordionSummary>
        <AccordionDetails>
          {checkList.map((row: CheckList) => mapCheckList(row, "4"))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
