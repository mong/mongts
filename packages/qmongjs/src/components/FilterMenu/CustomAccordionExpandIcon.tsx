import { Box } from "@mui/material";
import {
  AddCircleOutlineOutlined,
  RemoveCircleOutlineOutlined,
} from "@mui/icons-material";

export const CustomAccordionExpandIcon = () => {
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
        <RemoveCircleOutlineOutlined color="primary" />
      </Box>
      <Box className="collapseIconWrapper">
        <AddCircleOutlineOutlined color="primary" />
      </Box>
    </Box>
  );
};

export default CustomAccordionExpandIcon;
