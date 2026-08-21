import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Stack } from "@mui/material";

export const LoadingComponent = (
  <Stack
    spacing={6}
    sx={{
      height: "484px",
      justifyContent: "center",
      alignItems: "center",
      background: "#FFFFFF",
      border: "1px solid #2354AE",
      borderRadius: "16px",
    }}
  >
    <h3 className="animate-pulse">Laster data...</h3>
    <div className="animate-spin">
      <AutorenewIcon fontSize="large" />
    </div>
  </Stack>
);
