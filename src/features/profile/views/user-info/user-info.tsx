import { FC } from "react";
import { Stack, Typography, useMediaQuery } from "@mui/material";
import useRatingColor from "shared/hooks/use-rating-color";
import { formatDate } from "shared/helpers";
import { ReactComponent as WorkIcon } from "assets/icons/work-field.svg";
import { ReactComponent as StackOverflowIcon } from "assets/icons/stack-overflow.svg";
import { ReactComponent as GitIcon } from "assets/icons/git-hub.svg";
import { ReactComponent as LinkedIn } from "assets/icons/linked-in.svg";
import { ReactComponent as Telegram } from "assets/icons/telegram.svg";
import { ReactComponent as WebSiteIcon } from "assets/icons/website.svg";
import { useTheme } from "@mui/system";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

import { IUserInfo } from "./user-info.types";
import AvatarUpload from "../avatar-upload";
import {
  StyledButtonBox,
  StyledColumnStack,
  StyledDateStack,
  StyledDesktopStack,
  StyledHiddenIconBox,
  StyledIconButton,
  StyledIconStack,
  StyledMobileStack,
  StyledNameBox,
  StyledPaper,
  StyledRatingBox,
  StyledRowStack,
  StyledWebsiteStack,
} from "./user-info.styled";

const UserInfo: FC<IUserInfo> = ({ data }) => {
  const { user } = data;
  const ratingColor = useRatingColor(user?.rating?.rating);

  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const routeEdit = () => navigate("/profile/edit");

  return (
    <StyledPaper>
      <StyledButtonBox>
        <StyledIconButton onClick={routeEdit}>
          <EditIcon color="primary" />
        </StyledIconButton>
      </StyledButtonBox>
      <StyledRowStack>
        <Stack>
          <AvatarUpload user={user} hideIcons={isDownMd} />
          <StyledHiddenIconBox>
            <StyledIconStack>
              <StackOverflowIcon />
              <GitIcon />
              <LinkedIn />
              <Telegram />
              <WebSiteIcon />
            </StyledIconStack>
          </StyledHiddenIconBox>
        </Stack>
        <StyledColumnStack>
          <StyledNameBox>
            <Typography variant="h5">{user?.firstName}</Typography>
            <Typography variant="h5">{user?.lastName}</Typography>
          </StyledNameBox>
          <StyledRatingBox>
            <Typography variant="h3" color={ratingColor}>
              {user?.rating?.rating}
            </Typography>
            <Typography variant="caption" color={ratingColor}>
              Рейтинг
            </Typography>
          </StyledRatingBox>
          <StyledDesktopStack>
            <StyledDateStack>
              <Typography variant="body2">Дата регистрации</Typography>
              <Typography variant="body2" color="textSecondary">
                {formatDate(user?.creationDate, "DD.MM.YYYY")}
              </Typography>
            </StyledDateStack>
            <StyledWebsiteStack>
              <WorkIcon />
              <Typography variant="h5" color="textSecondary">
                QA Automation Engineer
              </Typography>
            </StyledWebsiteStack>
          </StyledDesktopStack>
        </StyledColumnStack>
      </StyledRowStack>
      <StyledMobileStack>
        <StyledDateStack>
          <Typography variant="body2">Дата регистрации</Typography>
          <Typography variant="body2" color="textSecondary">
            {formatDate(user?.creationDate, "DD.MM.YYYY")}
          </Typography>
        </StyledDateStack>
        <StyledIconStack>
          <StackOverflowIcon />
          <GitIcon />
          <LinkedIn />
          <Telegram />
          <WebSiteIcon />
        </StyledIconStack>
        <StyledWebsiteStack>
          <WorkIcon />
          <Typography variant="h5" color="textSecondary">
            QA Automation Engineer
          </Typography>
        </StyledWebsiteStack>
      </StyledMobileStack>
    </StyledPaper>
  );
};

export default UserInfo;
