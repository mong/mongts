import React, { PropsWithChildren, useState } from "react";
import { Tabs, Tab } from "@mui/material";

type TreatmentQualityTabsProps = PropsWithChildren<{
  context: string | undefined;
  onTabChanged: (string) => void;
}>;

export default function TreatmentQualityTabs({ context, onTabChanged }) {
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
      textColor="primary"
      indicatorColor="primary"
      aria-label="Arkfaner for behandlingskvalitet og opptaksområde"
    >
      <Tab label="Behandlingsenheter" value={"caregiver"} />
      <Tab label="Opptaksområder" value={"resident"} />
    </Tabs>
  );
}
