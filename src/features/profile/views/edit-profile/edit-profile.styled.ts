import { styled } from "@mui/system";
import { Button, Paper } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

export const StyledPaper = styled(Paper)({
  padding: "24px",
});

export const StyledRouteButton = styled(Button)(({ theme }) => ({
  margin: "0 0 15px",
  padding: "4px 16px",
}));

export const StyledIcon = styled(ChevronLeftIcon)({
  marginRight: "10px",
});
