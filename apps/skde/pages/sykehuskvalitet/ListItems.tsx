import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import FilterAlt from "@mui/icons-material/FilterAlt";
import Box from "@mui/material/Box";
import { TreatmentQualityFilterMenu } from "qmongjs";

interface ListItemsProps {
  toggleDrawer: () => void;
}

export const ListItems = ({ toggleDrawer }: ListItemsProps) => {
  return (
    <>
      <ListItemButton onClick={toggleDrawer}>
        <ListItemIcon>
          <FilterAlt />
        </ListItemIcon>
        <ListItemText primary="Filtrering av indikatorer" />
      </ListItemButton>
      <ListItem>
        <ListItemIcon />
        <Box sx={{ width: 450 }}>
          <TreatmentQualityFilterMenu
            medicalfields={{
              default: { value: "all", valueLabel: "Alle fagområder" },
              options: [{ value: "all", valueLabel: "Alle fagområder" }],
            }}
            treatmentunitstree={{
              defaults: [
                { value: "all", valueLabel: "Alle behandlingsenheter" },
              ],
              treedata: [
                {
                  nodeValue: {
                    value: "all",
                    valueLabel: "Alle behandlingsenheter",
                  },
                },
              ],
            }}
          />
        </Box>
      </ListItem>
    </>
  );
};
