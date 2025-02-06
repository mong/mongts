import { Box } from "@mui/material";
import { PropsWithChildren } from "react";

export const PageWrapper = ({ children }: PropsWithChildren) => (
  <Box
    sx={{
      backgroundColor: "background.paper",
      "& .header-top, & .header-middle, & .main-toolbar, & .footer": {
        paddingX: { xs: 2, sm: 4, lg: 6, xl: 16 },
      },
      "& .menu-wrapper": {
        xxl: {
          paddingLeft: 16,
        },
      },
      "& .table-wrapper table, & .table-wrapper .MuiTable-root": {
        paddingX: { xs: 2, sm: 4, lg: 6, xl: 16 },
        paddingLeft: { xxl: 2 },
      },
      "& .hospital-profile-box, & .hospital-profile-footer": {
        paddingX: { xs: 2, sm: 4, lg: 6, xl: 16, xxl: 0 },
      },
    }}
  >
    {children}
  </Box>
);
