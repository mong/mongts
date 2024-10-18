import { Skeleton, Box } from "@mui/material";

export default function BeadLineSkeleton() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box maxWidth={900} width="100%">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height={124}
        />
      </Box>
    </div>
  );
}
