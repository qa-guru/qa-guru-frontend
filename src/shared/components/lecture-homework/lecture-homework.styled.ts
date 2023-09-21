import { styled } from "@mui/system";
import { Paper } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
  marginTop: "25px",
}));
