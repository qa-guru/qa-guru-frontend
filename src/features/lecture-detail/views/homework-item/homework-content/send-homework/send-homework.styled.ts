import { styled } from "@mui/system";
import { LoadingButton } from "@mui/lab";
import { Stack, Box } from "@mui/material";

export const StyledStack = styled(Stack)(({ theme }) => ({
  marginTop: "15px",
  flexDirection: "row",
  gap: theme.spacing(2),
}));

export const StyledBox = styled(Box)({
  width: "100%",
});

export const StyledLoadingButton = styled(LoadingButton)({
  textTransform: "none",
  minWidth: "151px",
  marginTop: "15px",
});
