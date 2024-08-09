import { AnalyseData, Tag } from "../../types";

import { Box, Chip } from "@mui/material";

import { useAnalyseFilter } from "../../helpers/hooks";

const capitalize = (s: string) => s[0].toUpperCase() + s.slice(1);

export type AnalyseBoxFilterProps = {
  kompendium: string,
  tagsMetadata: { [k: string]: Tag },
  analyser: AnalyseData[]
};

export const AnalyseBoxFilter = ({ kompendium, tagsMetadata, analyser }: AnalyseBoxFilterProps ) => {
  const [tags, toggleTag] = useAnalyseFilter();

  const selectedAnalyser = analyser.filter((analyse) => 
    analyse.tags.filter((tag) => tags.has(tag)).length === tags.size
  );

  const allTags = new Set(selectedAnalyser.flatMap((analyse) => analyse.tags)
    .filter((tag) => !tags.has(tag) && tag !== kompendium));
  console.log(allTags);

  return (
    <Box>
      {Array.from(tags).map((tag) => (
        <Chip label={tagsMetadata[tag]?.fullname || capitalize(tag)} color="primary" key={tag} onDelete={() => toggleTag(tag)}
          sx={{marginRight: "1em"}} />
        ))}
      {Array.from(allTags).map((tag) => (
        <Chip label={tagsMetadata[tag]?.fullname || capitalize(tag)}  color="primary" key={tag} variant="outlined" onClick={() => toggleTag(tag)}
        sx={{marginRight: "1em"}}/>
      ))}
    </Box>
  );
};