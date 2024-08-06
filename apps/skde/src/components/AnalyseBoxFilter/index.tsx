import { AnalyseData } from "../../types";

import { Typography, Box, Chip } from "@mui/material";

import { useAnalyseFilter } from "../../helpers/hooks";

export type AnalyseBoxFilterProps = {
  kompendium: string,
  analyser: AnalyseData[]
};

export const AnalyseBoxFilter = ({ kompendium, analyser }: AnalyseBoxFilterProps ) => {
  const [tags, toggleTag] = useAnalyseFilter();

  const allTags = new Set(analyser.flatMap((analyse) => analyse.tags)
    .filter((tag) => !tags.has(tag) && tag !== kompendium));
  console.log(allTags);

  return (
    <Box>
      {Array.from(tags).map((tag) => (
        <Chip label={tag} key={tag} onClick={() => toggleTag(tag)} onDelete={() => toggleTag(tag)} />
        ))}
      {Array.from(allTags).map((tag) => (
        <Chip label={tag} key={tag} variant="outlined" onClick={() => toggleTag(tag)}/>
      ))}
    </Box>
  );
};