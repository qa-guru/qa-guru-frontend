import { styled } from "@mui/system";
import { Box } from "@mui/material";

export const StyledBox = styled(Box)({
  padding: "5px 10px",
});

export const StyledEditBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
}));

export const StyledTeachersBox = styled(Box)({
  padding: "5px",
});
