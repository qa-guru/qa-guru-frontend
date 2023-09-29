import { grey, primary } from "theme/colors";
import { styled } from "@mui/system";
import { Box, Button, DialogContent, Stack } from "@mui/material";

export const style = {
  loadMoreBtn: { color: primary.main, margin: "1vh auto" },
  emptyColumn: {
    backgroundColor: grey.light,
    borderRadius: "10px",
    height: "69vh",
    boxShadow: "0px 2px 6px 2px rgba(0, 0, 0, 0.1)",
    margin: 10,
  },
};

export const StyledWrapper = styled(Box)(({ theme }) => ({
  padding: "25px 10px 5px 20px",
  width: "390px",
}));

export const StyledDialogContent = styled(DialogContent)(({ theme }) => ({
  textAlign: "center",
}));

export const StyledStack = styled(Stack)(({ theme }) => ({
  width: "100%",
  gap: theme.spacing(1),
  flexDirection: "row",
  justifyContent: "space-around",
  marginBottom: "15px",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: "145px",
}));

export const StyledCancelButton = styled(Button)(({ theme }) => ({
  width: "145px",
  color: theme.palette.black.main,
}));
