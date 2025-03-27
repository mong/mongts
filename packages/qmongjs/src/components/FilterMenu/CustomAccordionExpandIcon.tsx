import { Box, styled } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import RemoveCircleOutlineRoundedIcon from "@mui/icons-material/RemoveCircleOutlineRounded";

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
        <RemoveCircleOutlineRoundedIcon color="primary" />
      </Box>
      <Box className="collapseIconWrapper">
        <AddCircleOutlineRoundedIcon color="primary" />
      </Box>
    </WrapperBox>
  );
};
