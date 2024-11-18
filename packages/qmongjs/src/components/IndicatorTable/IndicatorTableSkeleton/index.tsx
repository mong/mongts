import { Box, Stack, Skeleton } from "@mui/material";
import { useScreenSize } from "@visx/responsive";
import { breakpoints } from "../../../themes/SkdeTheme";

const SkeletonRow = () => {
  return (
    <Box width={"40rem"} height={"12rem"} sx={{ backgroundColor: "white" }}>
      <Stack
        direction="row"
        spacing={4}
        marginTop={2}
        marginLeft={2}
        alignItems="center"
      >
        <Stack spacing={1}>
          <Skeleton variant="rectangular" width={"20rem"} height={"2rem"} />
          <Skeleton variant="rectangular" width={"12rem"} height={"4rem"} />
          <Skeleton variant="rectangular" width={"20rem"} height={"2rem"} />
        </Stack>
        <Skeleton variant="circular" width={"10rem"} height={"10rem"} />
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
        <SkeletonRow key={el} />
      ))}
    </Stack>
  ) : (
    <Stack spacing={1} marginTop={2} marginLeft={2}>
      {Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]).map((el) => (
        <SkeletonRow key={el} />
      ))}
    </Stack>
  );
};
