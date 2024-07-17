import { FC } from "react";

import { StyledKanbanSkeleton, StyledKanbanWrapper } from "../skeletons.styled";
import { useResponsive } from "../../../hooks";

const SkeletonKanban: FC = () => {
  const { isDesktop } = useResponsive();

  return isDesktop ? (
    <StyledKanbanWrapper>
      <StyledKanbanSkeleton variant="rounded" />
      <StyledKanbanSkeleton variant="rounded" />
      <StyledKanbanSkeleton variant="rounded" />
      <StyledKanbanSkeleton variant="rounded" />
    </StyledKanbanWrapper>
  ) : (
    <StyledKanbanSkeleton variant="rounded" />
  );
};

export default SkeletonKanban;
