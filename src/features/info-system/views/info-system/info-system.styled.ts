import { styled } from "@mui/system";
import { Paper, Stack, Typography } from "@mui/material";

interface IStyledIcon {
  color: string;
}

export const StyledTitle = styled(Typography)({
  marginBottom: "20px",
});

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
  [theme.breakpoints.down("md")]: {
    padding: "12px",
  },
}));

export const StyledInfoStack = styled(Stack)(({ theme }) => ({
  gap: "15px",
}));

export const StyledIconStack = styled(Stack)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "16px",
});

export const StyledIconBox = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "color",
})<IStyledIcon>(({ theme, color }) => ({
  border: `2px solid ${color}`,
  borderRadius: "12px",
  alignItems: "center",
  justifyContent: "center",
  padding: "5px 23px",
  width: "100px",
  height: "100px",
  [theme.breakpoints.down("md")]: {
    width: "80px",
    height: "80px",
  },
}));

export const StyledTypography = styled(Typography, {
  shouldForwardProp: (prop) => prop !== "color",
})<IStyledIcon>(({ color }) => ({
  color,
}));
