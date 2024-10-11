import { Box, styled } from "@mui/material";
import {
  AddCircleOutlineRounded,
  RemoveCircleOutlineRounded,
} from "@mui/icons-material";

const WrapperBox = styled(Box)(({ theme }) => ({
  marginRight: 12,
  ".Mui-expanded & > .collapseIconWrapper": {
    display: "none",
  },
  ".expandIconWrapper": {
    display: "none",
  },
  ".Mui-expanded & > .expandIconWrapper": {
    display: "block",
  },
  [theme.breakpoints.down("md")]: {
    paddingTop: 1,
  },
  [theme.breakpoints.up("md")]: {
    paddingTop: 3,
  },
}));

export const CustomAccordionExpandIcon = () => {
  return (
    <WrapperBox>
      <Box className="expandIconWrapper">
        <RemoveCircleOutlineRounded color="primary" />
      </Box>
      <Box className="collapseIconWrapper">
        <AddCircleOutlineRounded color="primary" />
      </Box>
    </WrapperBox>
  );
};
