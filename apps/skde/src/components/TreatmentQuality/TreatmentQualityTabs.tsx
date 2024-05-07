import React, { PropsWithChildren, useState } from "react";
import { Tabs, Tab, styled } from "@mui/material";

type TreatmentQualityTabsProps = PropsWithChildren<{
  context: string | undefined;
  onTabChanged: (newValue: string) => void;
  isPhoneSizedScreen?: boolean;
}>;

export const StyledTabs = styled(Tabs)(({ theme }) => ({
  "& .Mui-selected": {
    backgroundColor: theme.palette.background.paper,
  },
}));

export const StyledTab = styled(Tab)(({ theme }) => ({
  font: theme.typography.button.font,
  borderRadius: 4,
  [theme.breakpoints.down("sm")]: {
    padding: "12px",
    fontSize: "13px",
  },
}));

export default function TreatmentQualityTabs({
  context,
  onTabChanged,
  isPhoneSizedScreen,
}: TreatmentQualityTabsProps) {
  const orientation = isPhoneSizedScreen ? "vertical" : "horizontal";

  const [value, setValue] = useState(
    context === "resident" ? "resident" : "caregiver",
  );

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    setTimeout(() => {
      onTabChanged(newValue);
    }, 0);
  };

  return (
    <StyledTabs
      value={value}
      onChange={handleChange}
      aria-label="Arkfaner for behandlingskvalitet og opptaksområde"
      orientation={orientation}
    >
      <StyledTab label="Behandlingsenheter" value={"caregiver"} />
      <StyledTab label="Opptaksområder" value={"resident"} />
    </StyledTabs>
  );
}
