import { FC } from "react";
import { StyledHomeworkBox, StyledHomeworkSkeleton } from "../skeletons.styled";

const SkeletonLectureHomework: FC = () => {
  return (
    <StyledHomeworkBox>
      <StyledHomeworkSkeleton variant="rounded" />
    </StyledHomeworkBox>
  );
};

export default SkeletonLectureHomework;
