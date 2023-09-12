import React from "react";
import { Box, Skeleton } from "@mui/material";

const SkeletonLectureHomework: React.FC = () => {
  return (
    <Box mt="15px">
      <Skeleton variant="rounded" width="100%" height={130} />
    </Box>
  );
};

export default SkeletonLectureHomework;
