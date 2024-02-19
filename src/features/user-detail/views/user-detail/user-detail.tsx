import { FC } from "react";
import { Box, Container, Stack, Typography } from "@mui/material";
import useRatingColor from "shared/hooks/use-rating-color";
import { formatDate } from "shared/helpers";
import WorkIcon from "assets/icons/work-field.svg";
import StackOverflowIcon from "assets/icons/stack-overflow.svg";
import GitIcon from "assets/icons/git-hub.svg";
import LinkedIn from "assets/icons/linked-in.svg";
import Telegram from "assets/icons/telegram.svg";
import WebSiteIcon from "assets/icons/website.svg";
import AvatarCustom from "shared/components/avatar-custom";

import {
  StyledColumnStack,
  StyledDateStack,
  StyledIconStack,
  StyledInfoBox,
  StyledPaper,
  StyledRowStack,
  StyledWebsiteStack,
} from "./user-detail.styled";
import { IUserDetail } from "./user-detail.types";

const UserDetail: FC<IUserDetail> = ({ data }) => {
  const { userById } = data;

  const ratingColor = useRatingColor(userById?.rating?.rating);
  const fullName = `${userById?.firstName} ${userById?.lastName}`;

  return (
    <Container>
      <StyledPaper>
        <StyledRowStack>
          <Stack>
            <AvatarCustom
              img={userById?.avatar}
              fullName={fullName}
              width={250}
              height={250}
            />

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
                  Зарегистрирован(a)
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
    </Container>
  );
};

export default UserDetail;
