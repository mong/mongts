import AutorenewIcon from "@mui/icons-material/Autorenew";
import { Stack } from "@mui/material";

export const LoadingComponent = (
  <Stack
    height="484px"
    spacing={6}
    justifyContent="center"
    alignItems="center"
    sx={{
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
