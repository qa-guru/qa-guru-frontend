import { styled } from "@mui/system";
import { Paper, Stack, Typography } from "@mui/material";
import { CoPresentOutlined } from "@mui/icons-material";

export const StyledPaperStack = styled(Stack)({
  flexDirection: "column",
  gap: "30px",
  margin: "20px 0 30px",
});

export const StyledNestedPaper = styled(Paper)(({ theme }) => ({
  padding: "12px",
  [theme.breakpoints.down("md")]: {
    padding: "6px",
  },
}));

export const StyledNestedPaperStack = styled(Stack)({
  gap: "16px",
});

export const StyledCoPresentIcon = styled(CoPresentOutlined)(({ theme }) => ({
  color: theme.palette.app.indigo,
  width: "60px",
  height: "60px",
  [theme.breakpoints.down("md")]: {
    width: "40px",
    height: "40px",
  },
}));

export const StyledDescriptionTypography = styled(Typography)({
  marginLeft: "15px",
});
