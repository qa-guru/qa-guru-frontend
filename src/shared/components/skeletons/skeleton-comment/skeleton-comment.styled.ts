import { styled } from "@mui/system";
import { Skeleton, Stack } from "@mui/material";

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  marginTop: "20px",
  gap: theme.spacing(1),
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
}));

export const StyledRowStack = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  flexDirection: "row",
  alignItems: "center",
}));

export const StyledStackItem = styled(Stack)(({ theme }) => ({
  width: "10%",
}));

export const StyledCircularSkeleton = styled(Skeleton)(({ theme }) => ({
  width: 40,
  height: 40,
}));

export const StyledRoundedSkeleton = styled(Skeleton)(({ theme }) => ({
  width: "100%",
  height: 60,
}));

export const StyledSkeleton = styled(Skeleton)(({ theme }) => ({
  fontSize: "0.7rem",
}));
