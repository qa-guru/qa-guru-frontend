import { styled } from "@mui/system";
import { Box, Chip, Link, Stack } from "@mui/material";

export const StyledWrapperStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
  textAlign: "start",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(1),
  alignItems: "center",
  textAlign: "start",
  justifyContent: "space-between",
}));

export const StyledLink = styled(Link)({
  textDecoration: "none",
}) as typeof Link;

export const StyledRatingChip = styled(Chip)(({ theme }) => ({
  color: theme.palette.app.indigo,
  border: `1px solid ${theme.palette.app.indigo}`,
  minWidth: "24px",
  padding: "3px 4px",
  "& .MuiChip-label": {
    height: "18px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 6px",
  },
}));

export const StyledDateStack = styled(Stack)({
  flexDirection: "row",
  justifyContent: "space-between",
});

export const StyledBox = styled(Box)({
  lineHeight: "5px",
});
