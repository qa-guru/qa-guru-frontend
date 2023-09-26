import { styled } from "@mui/system";
import { Grid } from "@mui/material";

export const StyledGrid = styled(Grid)(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: 1000,
  justifyContent: "center",
  alignItems: "center",
}));

// export const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
//   color: theme.palette.primary.main,
// }));
