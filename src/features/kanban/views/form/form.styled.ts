import { styled } from "@mui/system";
import { Accordion, Stack } from "@mui/material";

export const StyledAccordion = styled(Accordion)({
  boxShadow:
    "0px 1px 3px 0px rgba(0, 0, 0, 0.12), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.20)",
  "& .MuiPaper": {
    borderRadius: 0,
  },
});

export const StyledColumnStack = styled(Stack)(({ theme }) => ({
  flexDirection: "column",
  gap: theme.spacing(2),
}));

export const StyledRowStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: theme.spacing(2),
  justifyContent: "center",
}));

export const StyledRow = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: theme.spacing(1),
  minHeight: "100%",
}));
