import { styled } from "@mui/system";
import { Box, Skeleton, Stack, Typography } from "@mui/material";

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  marginTop: "20px",
  gap: "10px",
  width: "100%",
}));

export const StyledHomeworksWrapper = styled(Stack)(({ theme }) => ({
  margin: "25px 0 20px",
  gap: "15px",
  width: "100%",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
}));

export const StyledRowStack = styled(Stack)(({ theme }) => ({
  gap: "10px",
  flexDirection: "row",
  alignItems: "center",
}));

export const StyledStackItem = styled(Stack)({
  width: "10%",
});

export const StyledCircularSkeleton = styled(Skeleton)({
  width: 40,
  height: 40,
});

export const StyledRoundedSkeleton = styled(Skeleton)({
  width: "100%",
  height: 60,
});

export const StyledSkeleton = styled(Skeleton)({
  fontSize: "0.7rem",
});

export const StyledTitleSkeleton = styled(Skeleton)({
  margin: "10px 0",
  height: "40px",
  width: "40%",
});

export const StyledHomeworkBox = styled(Box)({
  marginTop: "15px",
});

export const StyledHomeworkSkeleton = styled(Skeleton)({
  width: "100%",
  height: "130px",
});

export const StyledHomeworksSkeleton = styled(Skeleton)({
  width: "100%",
  height: "240px",
});

export const StyledTypography = styled(Typography)({
  margin: "0 0 15px",
});
