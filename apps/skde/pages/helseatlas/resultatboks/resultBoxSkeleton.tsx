import { Skeleton, Box } from "@mui/material";

export default function ResultBoxSkeleton() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box width="100%">
        <Skeleton
          variant="rectangular"
          animation="wave"
          width="100%"
          height="100%"
        />
      </Box>
    </div>
  );
}
