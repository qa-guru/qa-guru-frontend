import { styled } from "@mui/system";
import { Accordion, AccordionDetails, Stack } from "@mui/material";

export const StyledAccordion = styled(Accordion)({
  boxShadow:
    "0px 1px 3px 0px rgba(0, 0, 0, 0.12), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.20)",
  "& .MuiPaper": {
    borderRadius: 0,
  },
  margin: "0 5px",
});

export const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  position: "absolute",
  backgroundColor:
    theme.palette.mode === "light"
      ? theme.palette.app.white
      : theme.palette.app.secondary,
  top: "45px",
  paddingTop: "20px",
  zIndex: 10,
  width: "100%",
  borderRadius: "0 0 5px 5px",
  boxShadow:
    "0px 2px 3px rgba(0, 0, 0, 0.12), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 2px 1px rgba(0, 0, 0, 0.20)",
}));

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
  margin: "6px 0 0",
}));
