import { styled } from "@mui/system";
import { Stack } from "@mui/material";

interface IStyledCardHeader {
  isActive?: boolean;
}

export const StyledCardHeader = styled(Stack, {
  shouldForwardProp: (prop) => !["isActive"].includes(prop as string),
})<IStyledCardHeader>(({ theme, isActive }) => ({
  backgroundColor: isActive
    ? `1px solid ${theme.palette.app.primary}30`.slice(10)
    : theme.palette.app.lightGrey,
  justifyContent: "space-between",
  boxShadow: "0px 3px 3px rgba(0, 0, 0, 0.2)",
  padding: "8px",
  width: "100%",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  position: "relative",
  flexDirection: "row",
}));
