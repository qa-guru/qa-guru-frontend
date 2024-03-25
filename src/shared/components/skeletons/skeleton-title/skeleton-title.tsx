import { FC } from "react";

import { StyledHomeworkBox, StyledTitleSkeleton } from "../skeletons.styled";

const SkeletonTitle: FC = () => {
  return (
    <StyledHomeworkBox>
      <StyledTitleSkeleton />
    </StyledHomeworkBox>
  );
};

export default SkeletonTitle;
