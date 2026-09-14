import { styled } from "@mui/system";
import { Paper } from "@mui/material";

export const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: "30px",
  padding: "15px",
  [theme.breakpoints.up("sm")]: {
    padding: "20px",
  },
  marginBottom: "30px",
}));
