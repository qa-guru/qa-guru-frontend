import { styled } from "@mui/system";
import { AvatarGroup, Box, Stack } from "@mui/material";

export const StyledTrainingStack = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
  padding: "5px 10px",
});

export const StyledUserRowBox = styled(Box)({
  padding: "3px 10px",
});

export const StyledEditBox = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
});

export const StyledAvatarGroup = styled(AvatarGroup)({
  "& .MuiAvatar-root": {
    width: 35,
    height: 35,
    fontSize: 15,
  },
});

export const StyledUserRowStack = styled(Stack)({
  flexDirection: "row",
  gap: "20px",
  margin: "16px 0",
});

export const StyledTeachersBox = styled(Box)({
  padding: "5px",
});
