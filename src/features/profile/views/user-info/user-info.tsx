import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import useRatingColor from "shared/hooks/use-rating-color";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import AvatarUpload from "shared/components/avatar-upload";
import MediaLinks from "shared/components/media-links/media-links";
import UserInfoMobile from "shared/user-info/user-info-mobile";
import UserInfoDesktop from "shared/user-info/user-info-desktop";

import { IUserInfo } from "./user-info.types";
import {
  StyledButtonBox,
  StyledColumnStack,
  StyledHiddenIconBox,
  StyledIconButton,
  StyledNameBox,
  StyledPaper,
  StyledRatingBox,
  StyledRowStack,
} from "./user-info.styled";

const UserInfo: FC<IUserInfo> = ({ data }) => {
  const { firstName, rating, lastName, creationDate } = data.user!;

  const user = data?.user;
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
          <AvatarUpload user={user} />
          <StyledHiddenIconBox>
            <MediaLinks user={user} />
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
          <UserInfoDesktop creationDate={creationDate} />
        </StyledColumnStack>
      </StyledRowStack>
      <UserInfoMobile user={user} creationDate={creationDate} />
    </StyledPaper>
  );
};

export default UserInfo;
