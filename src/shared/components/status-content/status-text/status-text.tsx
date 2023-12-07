import { FC } from "react";
import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ReactComponent as Clock } from "assets/icons/clock.svg";
import { ReactComponent as Search } from "assets/icons/search.svg";
import { ReactComponent as Done } from "assets/icons/done.svg";
import { red } from "theme/colors";

import { StyledStack } from "./status-text.styled";
import { IStatusText } from "./status-text.types";

export const RedHighlightOffIcon = styled(HighlightOffIcon)({
  color: red.main,
});

const StatusText: FC<IStatusText> = ({ status }) => {
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
    <StyledStack>
      {icon}
      <Box>
        <Typography variant="body2">{statusText}</Typography>
      </Box>
    </StyledStack>
  );
};

export default StatusText;
