import { styled } from "@mui/system";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

export const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
}));

export const StyledSpinner = styled(CircularProgress)(({ theme }) => ({
  color: theme.palette.app.primary,
  width: "16px",
}));

export const StyledDeleteIcon = styled(DeleteIcon)(({ theme }) => ({
  color: theme.palette.app.primary,
  width: "16px",
}));
