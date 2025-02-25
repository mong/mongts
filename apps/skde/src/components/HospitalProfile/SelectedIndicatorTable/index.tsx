import { ItemBox } from "../HospitalProfileStyles";
import { indicatorsPerHospital } from "./indicators";
import { Typography, Box } from "@mui/material";

export type SelectedIndicatorTableProps = {
  unitName: string;
  titlePadding: number;
};

export const SelectedIndicatorTable = (props: SelectedIndicatorTableProps) => {
  const { unitName, titlePadding } = props;

  const selectedIndicators = indicatorsPerHospital.filter(
    (row) => row.unit === unitName,
  );
  console.log(selectedIndicators[0]);
  return (
    <ItemBox height={400}>
      <Box padding={titlePadding}>
        <Typography variant="h5">
          <b>Utvalgte indikatorer</b>
        </Typography>
      </Box>
    </ItemBox>
  );
};
