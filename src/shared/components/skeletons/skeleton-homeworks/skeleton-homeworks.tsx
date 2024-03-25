import { FC } from "react";

import {
  StyledHomeworksSkeleton,
  StyledHomeworksWrapper,
  StyledTypography,
} from "../skeletons.styled";

const SkeletonHomeworks: FC = () => {
  return (
    <StyledHomeworksWrapper>
      <StyledTypography variant="h3">
        Домашние работы других студентов
      </StyledTypography>
      <StyledHomeworksSkeleton variant="rounded" />
      <StyledHomeworksSkeleton variant="rounded" />
      <StyledHomeworksSkeleton variant="rounded" />
    </StyledHomeworksWrapper>
  );
};

export default SkeletonHomeworks;
