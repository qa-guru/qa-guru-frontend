import { FC } from "react";
import { Container, Stack, Typography } from "@mui/material";
import useRatingColor from "shared/hooks/use-rating-color";
import { formatDate } from "shared/helpers";
import { ReactComponent as WorkIcon } from "assets/icons/work-field.svg";
import AvatarUpload from "features/profile/views/avatar-upload";
import MediaLinks from "features/profile/views/media-links/media-links";

import {
  StyledColumnStack,
  StyledDateStack,
  StyledDesktopStack,
  StyledHiddenIconBox,
  StyledMobileStack,
  StyledNameBox,
  StyledPaper,
  StyledRatingBox,
  StyledRowStack,
  StyledWebsiteStack,
} from "./user-detail.styled";
import { IUserDetail } from "./user-detail.types";

const UserDetail: FC<IUserDetail> = ({ data }) => {
  const { rating, firstName, lastName, creationDate } = data?.userById!;

  const ratingColor = useRatingColor(rating?.rating);

  return (
    <Container>
      <StyledPaper>
        <StyledRowStack>
          <Stack>
            <AvatarUpload user={data?.userById} />
            <StyledHiddenIconBox>
              <MediaLinks user={data?.userById} />
            </StyledHiddenIconBox>
          </Stack>
          <StyledColumnStack>
            <StyledNameBox>
              <Typography variant="h5">{firstName}</Typography>
              <Typography variant="h5">{lastName}</Typography>
            </StyledNameBox>
            <StyledRatingBox>
              <Typography variant="h3" color={ratingColor}>
                {rating?.rating}
              </Typography>
              <Typography variant="caption" color={ratingColor}>
                Рейтинг
              </Typography>
            </StyledRatingBox>
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
          </StyledColumnStack>
        </StyledRowStack>
        <StyledMobileStack>
          <StyledDateStack>
            <Typography variant="body2">Дата регистрации</Typography>
            <Typography variant="body2" color="textSecondary">
              {formatDate(creationDate, "DD.MM.YYYY")}
            </Typography>
          </StyledDateStack>
          <MediaLinks user={data?.userById} />
          <StyledWebsiteStack>
            <WorkIcon />
            <Typography variant="h5" color="textSecondary">
              QA Automation Engineer
            </Typography>
          </StyledWebsiteStack>
        </StyledMobileStack>
      </StyledPaper>
    </Container>
  );
};

export default UserDetail;
