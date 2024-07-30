import { FC } from "react";
import { Typography } from "@mui/material";

import { ReactComponent as WorkIcon } from "assets/icons/work-field.svg";
import { formatDate } from "shared/helpers";

import { IUserInfoDesktop } from "./user-info-desktop.types";
import {
  StyledDateStack,
  StyledDesktopStack,
  StyledWebsiteStack,
} from "./user-info-desktop.styled";

const UserInfoDesktop: FC<IUserInfoDesktop> = ({ creationDate }) => {
  return (
    <StyledDesktopStack>
      <StyledDateStack>
        <Typography variant="body2">Дата регистрации</Typography>
        <Typography variant="body2" color="textSecondary">
          {formatDate(creationDate, "DD.MM.YYYY")}
        </Typography>
      </StyledDateStack>
      <StyledWebsiteStack>
        <WorkIcon />
        <Typography variant="h5" color="textSecondary">
          QA Automation Engineer
        </Typography>
      </StyledWebsiteStack>
    </StyledDesktopStack>
  );
};

export default UserInfoDesktop;
