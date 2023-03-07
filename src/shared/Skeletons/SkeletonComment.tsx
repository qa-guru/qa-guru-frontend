import { Skeleton, Stack } from "@mui/material";

const SkeletonComment = () => {
  return (
    <Stack mt="20px" spacing={1}>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Skeleton variant="circular" width={40} height={40} />
          <Stack width="10%">
            <Skeleton variant="text" sx={{ fontSize: "0.7rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "0.7rem" }} />
          </Stack>
        </Stack>
        <Skeleton variant="rounded" width="100%" height={60} />
      </Stack>
      <Stack spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Skeleton variant="circular" width={40} height={40} />
          <Stack width="10%">
            <Skeleton variant="text" sx={{ fontSize: "0.7rem" }} />
            <Skeleton variant="text" sx={{ fontSize: "0.7rem" }} />
          </Stack>
        </Stack>
        <Skeleton variant="rounded" width="100%" height={60} />
      </Stack>
    </Stack>
  );
};

export default SkeletonComment;
