import { Box, LoadingLogo } from "@mong/material-ui";

const LoadingFallback = () => (
  <Box
    border
    className="flex flex-col items-center justify-center text-brand-primary-600 gap-10 min-h-50 md:min-h-100 my-10"
  >
    <LoadingLogo message="Laster data" />
  </Box>
);

export default LoadingFallback;
