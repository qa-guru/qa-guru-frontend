import { styled } from "@mui/system";
import { Button, Box } from "@mui/material";

export const StyledBox = styled(Box)(({ theme }) => ({
  filter: "blur(3.5px)",
  pointerEvents: "none",
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  cursor: "default",
  borderRadius: "7px",
  "&:hover": { backgroundColor: theme.palette.primary.main },
}));
