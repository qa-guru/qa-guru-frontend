import { FC } from "react";
import { Box, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { ReactComponent as Clock } from "assets/icons/clock.svg";
import { ReactComponent as Search } from "assets/icons/search.svg";
import { ReactComponent as Done } from "assets/icons/done.svg";
import { styled } from "@mui/system";
import { StudentHomeWorkStatus } from "api/graphql/generated/graphql";

import { StyledStack } from "./status-text.styled";
import { IStatusText } from "./status-text.types";

export const RedHighlightOffIcon = styled(HighlightOffIcon)({
  color: "red",
});

const StatusText: FC<IStatusText> = ({ status }) => {
  let icon;
  let statusText;

  switch (status) {
    case StudentHomeWorkStatus.New:
      icon = <Clock />;
      statusText = "Новые";
      break;
    case StudentHomeWorkStatus.InReview:
      icon = <Search />;
      statusText = "На проверке";
      break;
    case StudentHomeWorkStatus.Approved:
      icon = <Done />;
      statusText = "Принято";
      break;
    case StudentHomeWorkStatus.NotApproved:
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
