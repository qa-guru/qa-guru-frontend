import { styled } from "@mui/system";
import { Button, Box } from "@mui/material";

export const StyledWrapper = styled(Box)({
  position: "relative",
});

export const StyledBox = styled(Box)({
  filter: "blur(3.5px)",
  pointerEvents: "none",
});

export const StyledHomeworkBox = styled(Box)({
  paddingTop: "40px",
});

export const StyledButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  cursor: "default",
  borderRadius: "7px",
  "&:hover": { backgroundColor: theme.palette.primary.main },
}));
