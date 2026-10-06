import { styled } from "@mui/system";
import { List, ListItem, Paper, Typography } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: "30px",
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
  marginBottom: "30px",
}));

export const StyledTitle = styled(Typography)({
  marginBottom: "8px",
});

export const StyledList = styled(List)(({ theme }) => ({
  marginTop: theme.spacing(1),
}));

export const StyledListItem = styled(ListItem)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#3a3b3c" : "#f0f2f5",
  borderRadius: theme.spacing(0.75),
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.25, 1),
  gap: theme.spacing(0.5),
  cursor: "pointer",
  "&:last-of-type": {
    marginBottom: 0,
  },
}));
