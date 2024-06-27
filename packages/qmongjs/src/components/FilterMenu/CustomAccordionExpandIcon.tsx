import { Box } from "@mui/material";
import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";

const CustomAccordionExpandIcon = () => {
  return (
    <Box
      sx={{
        ".Mui-expanded & > .collapseIconWrapper": {
          display: "none",
        },
        ".expandIconWrapper": {
          display: "none",
        },
        ".Mui-expanded & > .expandIconWrapper": {
          display: "block",
        },
      }}
    >
      <Box className="expandIconWrapper">
        <RemoveCircleOutlineRounded color="primary" />
      </Box>
      <Box className="collapseIconWrapper">
        <AddCircleOutlineRounded color="primary" />
      </Box>
    </Box>
  );
};

export default CustomAccordionExpandIcon;
