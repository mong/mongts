import { RegistryRequirement, RegistryScores, RegistryRank } from "types";
import {
  useRegistryScoresQuery,
  useRegistryRequirementsQuery,
  useRegistryRankQuery,
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
    <Stack direction="row" spacing={2}>
      {icon}
      <Typography
        dangerouslySetInnerHTML={{
          __html: row.text,
        }}
      />
    </Stack>
  );

  return line;
};
export const RequirementList = (props: RequirementListProps) => {
  const { registry, year } = props;

  const requirementsQuery = useRegistryRequirementsQuery();
  const scoresQuery = useRegistryScoresQuery(year);
  const rankQuery = useRegistryRankQuery(year);

  if (
    requirementsQuery.isFetching ||
    scoresQuery.isFetching ||
    rankQuery.isFetching
  ) {
    return null;
  }

  const rank = rankQuery.data.filter(
    (row: RegistryRank) => row.name === registry,
  )[0];

  const filteredScores = scoresQuery.data.filter(
    (row: RegistryScores) => row.name === registry,
  )[0];

  if (!filteredScores || !rank) {
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
      <Typography variant="h4" sx={{ marginBottom: 2 }}>
        {"Registeret har oppnådd stadium/nivå " + rank.verdict + " i " + year}
      </Typography>
      <Accordion defaultExpanded={rank.verdict.includes("1")}>
        <AccordionSummary id="stadium2" expandIcon={<ExpandMoreIcon />}>
          Krav til stadium 2
        </AccordionSummary>
        <AccordionDetails>
          {checkList.map((row: CheckList) => mapCheckList(row, "2"))}
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={rank.verdict.includes("2")}>
        <AccordionSummary id="stadium3" expandIcon={<ExpandMoreIcon />}>
          Krav til stadium 3
        </AccordionSummary>
        <AccordionDetails>
          {checkList.map((row: CheckList) => mapCheckList(row, "3"))}
        </AccordionDetails>
      </Accordion>

      <Accordion defaultExpanded={rank.verdict.includes("3")}>
        <AccordionSummary id="stadium4" expandIcon={<ExpandMoreIcon />}>
          Krav til stadium 4
        </AccordionSummary>
        <AccordionDetails>
          {checkList.map((row: CheckList) => mapCheckList(row, "4"))}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary id="level" expandIcon={<ExpandMoreIcon />}>
          Krav til nivå A og B
        </AccordionSummary>
        <AccordionDetails>
          {checkList.map((row: CheckList) => mapCheckList(row, "A"))}
          {checkList.map((row: CheckList) => mapCheckList(row, "B"))}
        </AccordionDetails>
      </Accordion>
    </>
  );
};
