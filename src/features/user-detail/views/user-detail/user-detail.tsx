import { UserByIdQuery } from "api/graphql/generated/graphql";
import { FC } from "react";
import { Box, Stack, Typography } from "@mui/material";
import useRatingColor from "shared/hooks/use-rating-color";
import { formatDate } from "shared/helpers";
import { ReactComponent as WorkIcon } from "assets/icons/work-field.svg";
import { ReactComponent as StackOverflowIcon } from "assets/icons/stack-overflow.svg";
import { ReactComponent as GitIcon } from "assets/icons/git-hub.svg";
import { ReactComponent as LinkedIn } from "assets/icons/linked-in.svg";
import { ReactComponent as Telegram } from "assets/icons/telegram.svg";
import { ReactComponent as WebSiteIcon } from "assets/icons/website.svg";
import AvatarUpload from "features/profile/views/avatar-upload";
import {
  StyledColumnStack,
  StyledDateStack,
  StyledIconStack,
  StyledInfoBox,
  StyledPaper,
  StyledRowStack,
  StyledWebsiteStack,
} from "features/profile/views/user-info/user-info.styled";

interface IUserDetail {
  data: UserByIdQuery;
}

const UserDetail: FC<IUserDetail> = ({ data }) => {
  const { userById } = data;

  const ratingColor = useRatingColor(userById?.rating?.rating);

  return (
    <StyledPaper>
      <StyledRowStack>
        <Stack>
          <AvatarUpload />
          <StyledIconStack>
            <StackOverflowIcon />
            <GitIcon />
            <LinkedIn />
            <Telegram />
            <WebSiteIcon />
          </StyledIconStack>
        </Stack>
        <StyledColumnStack>
          <StyledColumnStack>
            <Box>
              <Typography variant="h5">{userById?.firstName}</Typography>
              <Typography variant="h5">{userById?.lastName}</Typography>
            </Box>
            <StyledInfoBox>
              <Typography variant="h3" color={ratingColor}>
                {userById?.rating?.rating}
              </Typography>
              <Typography variant="caption" color={ratingColor}>
                Рейтинг
              </Typography>
            </StyledInfoBox>
            <StyledDateStack>
              <Typography variant="subtitle2" color="textPrimary">
                Зарегистрирован
              </Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {formatDate(userById?.creationDate, "DD.MM.YYYY")}
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

export default UserDetail;
