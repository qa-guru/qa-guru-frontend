import { styled } from "@mui/system";
import { IconButton, Stack } from "@mui/material";

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  width: "50%",
  marginBottom: "25px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    gap: "20px",
    marginBottom: "20px",
  },
}));

export const StyledIconButton = styled(IconButton)({
  margin: 0,
  padding: 0,
});
