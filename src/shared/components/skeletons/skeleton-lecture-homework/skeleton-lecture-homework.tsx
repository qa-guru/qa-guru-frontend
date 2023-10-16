import React from "react";
import { StyledHomeworkBox, StyledHomeworkSkeleton } from "../skeletons.styled";

const SkeletonLectureHomework: React.FC = () => {
  return (
    <StyledHomeworkBox>
      <StyledHomeworkSkeleton variant="rounded" />
    </StyledHomeworkBox>
  );
};

export default SkeletonLectureHomework;
