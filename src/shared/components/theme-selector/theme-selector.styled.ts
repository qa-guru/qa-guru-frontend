import { styled } from "@mui/system";
import { IconButton } from "@mui/material";

export const StyledIconButton = styled(IconButton)({
  "&:hover": {
    backgroundColor: "transparent",
  },
  "& .MuiSelect-select:focus": {
    backgroundColor: "transparent",
  },
  padding: 0,
});
