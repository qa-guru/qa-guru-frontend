import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import useRatingColor from "shared/hooks/use-rating-color";
import { formatDate } from "shared/helpers";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { ReactComponent as WorkIcon } from "assets/icons/work-field.svg";

import { IUserInfo } from "./user-info.types";
import AvatarUpload from "../avatar-upload";
import {
  StyledButtonBox,
  StyledColumnStack,
  StyledDateStack,
  StyledDesktopStack,
  StyledHiddenIconBox,
  StyledIconButton,
  StyledMobileStack,
  StyledNameBox,
  StyledPaper,
  StyledRatingBox,
  StyledRowStack,
  StyledWebsiteStack,
} from "./user-info.styled";
import MediaLinks from "../media-links/media-links";

const UserInfo: FC<IUserInfo> = ({ data }) => {
  const { firstName, rating, lastName, creationDate } = data.user!;

  const ratingColor = useRatingColor(rating?.rating);

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
          <AvatarUpload user={data.user} />
          <StyledHiddenIconBox>
            <MediaLinks user={data.user} />
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
        <MediaLinks user={data.user} />
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
