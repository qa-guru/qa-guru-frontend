import { styled } from "@mui/system";
import { Button, Paper, Stack } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import ImageIcon from "@mui/icons-material/Image";

export const StyledButtonStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  margin: "0 10px 15px",
  gap: "10px",
  justifyContent: "flex-end",
}));

export const StyledCancelButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.black,
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: "24px",
  [theme.breakpoints.down("md")]: {
    padding: "12px",
  },
}));

export const StyledCloseIcon = styled(CloseIcon)({
  marginRight: "5px",
});

export const StyledSubmitIcon = styled(CheckIcon)({
  marginRight: "5px",
});

export const StyledEditIcon = styled(EditIcon)({
  marginRight: "5px",
});

export const StyledImageIcon = styled(ImageIcon)({
  marginRight: "5px",
});

export const StyledWrapper = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "20px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const StyledPaperStack = styled(Stack)({
  flexDirection: "column",
  gap: "30px",
  marginBottom: "30px",
});

export const StyledInfoStack = styled(Stack)({
  flexDirection: "column",
  width: "100%",
  gap: "20px",
});

export const StyledInputStack = styled(Stack)(({ theme }) => ({
  flexDirection: "row",
  gap: "30px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
  },
}));

export const StyledContainedButton = styled(Button)(({ theme }) => ({
  color: theme.palette.app.white,
}));
