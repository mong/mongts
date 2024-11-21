import { Box, Stack, Skeleton } from "@mui/material";

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

  const numArr = [];

  for (let i = 0; i < nRows; i++) {
    numArr.push(i);
  }

  return (
    <Stack spacing={1} marginTop={2} marginLeft={2}>
      {Array.from(numArr).map((el) => (
        <SkeletonRow key={el} />
      ))}
    </Stack>
  );
};
