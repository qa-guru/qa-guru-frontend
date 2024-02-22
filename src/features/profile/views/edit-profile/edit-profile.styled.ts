import { styled } from "@mui/system";
import { Button, Paper, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import { LoadingButton } from "@mui/lab";

export const StyledButtonStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  margin: "0 0 15px",
  gap: "10px",
  justifyContent: "flex-end",
}));

export const StyledSubmitButton = styled(LoadingButton)(({ theme }) => ({
  color: theme.palette.app.white,
}));

export const StyledCancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.black,
}));

export const StyledPaper = styled(Paper)({
  padding: "24px",
});

export const StyledCloseIcon = styled(CloseIcon)({
  marginRight: "5px",
});

export const StyledSubmitIcon = styled(CheckIcon)({
  marginRight: "5px",
});

export const StyledColumnStack = styled(Stack)({
  flexDirection: "column",
  width: "100%",
  padding: "0 15px",
  gap: "20px",
});
