import { styled } from "@mui/system";
import { Box, Skeleton, Stack } from "@mui/material";

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  marginTop: "20px",
  gap: theme.spacing(1),
  width: "100%",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
}));

export const StyledRowStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
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

export const StyledHomeworkBox = styled(Box)({
  marginTop: "15px",
});

export const StyledHomeworkSkeleton = styled(Skeleton)({
  width: "100%",
  height: "130px",
});
