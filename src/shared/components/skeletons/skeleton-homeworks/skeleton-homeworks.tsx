import { FC } from "react";

import {
  StyledHomeworksSkeleton,
  StyledHomeworksWrapper,
} from "../skeletons.styled";

const SkeletonHomeworks: FC = () => {
  return (
    <StyledHomeworksWrapper>
      <StyledHomeworksSkeleton variant="rounded" />
      <StyledHomeworksSkeleton variant="rounded" />
      <StyledHomeworksSkeleton variant="rounded" />
    </StyledHomeworksWrapper>
  );
};

export default SkeletonHomeworks;
