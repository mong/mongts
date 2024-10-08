import { Box, Stack, Skeleton } from "@mui/material";
import { useScreenSize } from "@visx/responsive";
import { breakpoints } from "../../../themes/SkdeTheme";

const SkeletonRow = (props: { width: number }) => {
  const { width } = props;

  return (
    <Box width={width} height={180} sx={{ backgroundColor: "white" }}>
      <Stack
        direction="row"
        spacing={4}
        marginTop={2}
        marginLeft={2}
        alignItems="center"
      >
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width={width / 2} height={30} />
          <Skeleton variant="rectangular" width={(width / 3) * 2} height={60} />
          <Skeleton variant="rectangular" width={width / 3} height={30} />
        </Stack>
        <Skeleton variant="circular" width={100} height={100} />
      </Stack>
    </Box>
  );
};

export const IndicatorTableSkeleton = (props: { nRows: number }) => {
  const { nRows } = props;
  const { width } = useScreenSize();

  const numArr = [];

  for (let i = 0; i < nRows; i++) {
    numArr.push(i);
  }

  const drawer = width >= breakpoints.xxl;

  return !drawer ? (
    <Stack spacing={1} marginTop={2} marginLeft={2}>
      {Array.from(numArr).map((el) => (
        <SkeletonRow width={0.9 * width} key={el} />
      ))}
    </Stack>
  ) : (
    <Stack spacing={1} marginTop={2} marginLeft={2}>
      {Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((el) => (
        <SkeletonRow width={0.6 * width} key={el} />
      ))}
    </Stack>
  );
};
