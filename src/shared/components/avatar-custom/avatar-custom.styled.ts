import { styled } from "@mui/system";
import { Typography } from "@mui/material";

export const StyledTypography = styled(Typography)(({ theme }) => ({
  color: theme.palette.app.white,
}));
