import { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import useRatingColor from "shared/hooks/use-rating-color";
import { formatDate } from "shared/helpers";
import { ReactComponent as WorkIcon } from "assets/icons/work-field.svg";
import { ReactComponent as StackOverflowIcon } from "assets/icons/stack-overflow.svg";
import { ReactComponent as GitHubIcon } from "assets/icons/git-hub.svg";
import { ReactComponent as LinkedInIcon } from "assets/icons/linked-in.svg";
import { ReactComponent as TelegramIcon } from "assets/icons/telegram.svg";
import { ReactComponent as WebSiteIcon } from "assets/icons/website.svg";
import { ReactComponent as StackOverflowIconSecondary } from "assets/icons/stack-overflow-secondary.svg";
import { ReactComponent as GitHubIconSecondary } from "assets/icons/git-hub-secondary.svg";
import { ReactComponent as LinkedInIconSecondary } from "assets/icons/linked-in-secondary.svg";
import { ReactComponent as TelegramIconSecondary } from "assets/icons/telegram-secondary.svg";
import { ReactComponent as WebSiteIconSecondary } from "assets/icons/website-secondary.svg";

import { IUserInfo } from "./user-info.types";
import AvatarUpload from "../avatar-upload";
import {
  StyledColumnStack,
  StyledDateStack,
  StyledIconStack,
  StyledInfoBox,
  StyledLink,
  StyledPaper,
  StyledRowStack,
  StyledWebsiteStack,
} from "./user-info.styled";

const UserInfo: FC<IUserInfo> = ({ data }) => {
  const { user } = data;
  const ratingColor = useRatingColor(user?.rating?.rating);

  return (
    <StyledPaper>
      <StyledRowStack>
        <Stack>
          <AvatarUpload user={user} />
          <StyledIconStack>
            {user?.stackOverflow ? (
              <StyledLink href={user?.stackOverflow}>
                <StackOverflowIcon />
              </StyledLink>
            ) : (
              <StackOverflowIconSecondary />
            )}
            {user?.git ? (
              <StyledLink href={user?.git}>
                <GitHubIcon />
              </StyledLink>
            ) : (
              <GitHubIconSecondary />
            )}
            {user?.linkedin ? (
              <StyledLink href={user?.linkedin}>
                <LinkedInIcon />
              </StyledLink>
            ) : (
              <LinkedInIconSecondary />
            )}
            {user?.telegram ? (
              <StyledLink href={user?.telegram}>
                <TelegramIcon />
              </StyledLink>
            ) : (
              <TelegramIconSecondary />
            )}
            {user?.website ? (
              <StyledLink href={user?.website}>
                <WebSiteIcon />
              </StyledLink>
            ) : (
              <WebSiteIconSecondary />
            )}
          </StyledIconStack>
        </Stack>
        <StyledColumnStack>
          <StyledColumnStack>
            <Box>
              <Typography variant="h5">{user?.firstName}</Typography>
              <Typography variant="h5">{user?.lastName}</Typography>
            </Box>
            <StyledInfoBox>
              <Typography variant="h3" color={ratingColor}>
                {user?.rating?.rating}
              </Typography>
              <Typography variant="caption" color={ratingColor}>
                Рейтинг
              </Typography>
            </StyledInfoBox>
            <StyledDateStack>
              <Typography variant="subtitle2" color="textPrimary">
                Зарегистрирован(a)
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {formatDate(user?.creationDate, "DD.MM.YYYY")}
              </Typography>
            </StyledDateStack>
            <StyledWebsiteStack>
              <WorkIcon />
              <Typography variant="h5" color="textSecondary">
                QA Automation Engineer
              </Typography>
            </StyledWebsiteStack>
          </StyledColumnStack>
        </StyledColumnStack>
      </StyledRowStack>
    </StyledPaper>
  );
};

export default UserInfo;
