import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IStatusContent } from "./StatusContent.types";
import { ReactComponent as Clock } from "../../../assets/icons/clock.svg";
import { ReactComponent as Search } from "../../../assets/icons/search.svg";
import { ReactComponent as Done } from "../../../assets/icons/done.svg";
import { red } from "../../../theme/colors";

const RedHighlightOffIcon = styled(HighlightOffIcon)({
  color: red.main,
});

const StatusContent: React.FC<IStatusContent> = ({ status }) => {
  let icon;
  let statusText;

  switch (status) {
    case "NEW":
      icon = <Clock />;
      statusText = "Ожидает проверки";
      break;
    case "IN_REVIEW":
      icon = <Search />;
      statusText = "На проверке";
      break;
    case "APPROVED":
      icon = <Done />;
      statusText = "Принято";
      break;
    case "NOT_APPROVED":
      icon = <RedHighlightOffIcon />;
      statusText = "Не принято";
      break;
    default:
      return null;
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {icon}
      <Box>
        <Typography variant="body2">{statusText}</Typography>
      </Box>
    </Stack>
  );
};

export default StatusContent;
