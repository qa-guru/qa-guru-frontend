import { FC } from "react";
import { Typography } from "@mui/material";
import { ReactComponent as WorkIcon } from "assets/icons/work-field.svg";
import { formatDate } from "shared/helpers";
import MediaLinks from "shared/components/media-links/media-links";

import { IUserInfoMobile } from "./user-info-mobile.types";
import {
  StyledMobileStack,
  StyledDateStack,
  StyledWebsiteStack,
} from "./user-info-mobile.styled";

const UserInfoMobile: FC<IUserInfoMobile> = ({ creationDate, user }) => {
  return (
    <StyledMobileStack>
      <StyledDateStack>
        <Typography variant="body2">Дата регистрации</Typography>
        <Typography variant="body2" color="textSecondary">
          {formatDate(creationDate, "DD.MM.YYYY")}
        </Typography>
      </StyledDateStack>
      <MediaLinks user={user} />
      <StyledWebsiteStack>
        <WorkIcon />
        <Typography variant="h5" color="textSecondary">
          QA Automation Engineer
        </Typography>
      </StyledWebsiteStack>
    </StyledMobileStack>
  );
};

export default UserInfoMobile;
