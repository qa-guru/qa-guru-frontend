import {
  StyledCircularSkeleton,
  StyledRoundedSkeleton,
  StyledRowStack,
  StyledSkeleton,
  StyledStack,
  StyledStackItem,
  StyledWrapper,
} from "../skeletons.styled";

const SkeletonComment = () => {
  return (
    <StyledWrapper>
      <StyledStack>
        <StyledRowStack>
          <StyledCircularSkeleton variant="circular" />
          <StyledStackItem>
            <StyledSkeleton variant="text" />
            <StyledSkeleton variant="text" />
          </StyledStackItem>
        </StyledRowStack>
        <StyledRoundedSkeleton variant="rounded" />
      </StyledStack>
      <StyledStack>
        <StyledRowStack>
          <StyledCircularSkeleton variant="circular" />
          <StyledStackItem>
            <StyledSkeleton variant="text" />
            <StyledSkeleton variant="text" />
          </StyledStackItem>
        </StyledRowStack>
        <StyledRoundedSkeleton variant="rounded" />
      </StyledStack>
    </StyledWrapper>
  );
};

export default SkeletonComment;
