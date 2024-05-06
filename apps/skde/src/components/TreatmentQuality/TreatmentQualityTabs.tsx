import React, { PropsWithChildren, useState } from "react";
import { Tabs, Tab, styled } from "@mui/material";

type TreatmentQualityTabsProps = PropsWithChildren<{
  context: string | undefined;
  onTabChanged: (string) => void;
  isPhoneSizedScreen?: boolean;
}>;

export const StyledTab = styled(Tab)(({ theme }) => ({
  fontFamily: theme.typography.button.fontFamily,
  textTransform: "none",
}));

export default function TreatmentQualityTabs({
  context,
  onTabChanged,
  isPhoneSizedScreen,
}) {
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
    <Tabs
      value={value}
      onChange={handleChange}
      aria-label="Arkfaner for behandlingskvalitet og opptaksområde"
      sx={{ backgroundColor: "#00263d", borderRadius: 1 }}
      orientation={orientation}
    >
      <StyledTab label="Behandlingsenheter" value={"caregiver"} />
      <StyledTab label="Opptaksområder" value={"resident"} />
    </Tabs>
  );
}
