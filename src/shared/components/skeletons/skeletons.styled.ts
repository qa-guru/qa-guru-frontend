import { styled } from "@mui/system";
import { Box, Skeleton, Stack } from "@mui/material";

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

export const StyledKanbanWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "25px",
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

export const StyledKanbanSkeleton = styled(Skeleton)(({ theme }) => ({
  marginTop: "20px",
  width: "25%",
  height: "calc(100vh - 295px)",
  [theme.breakpoints.down("md")]: {
    height: "calc(100dvh - 270px )",
    width: "100%",
  },
}));
