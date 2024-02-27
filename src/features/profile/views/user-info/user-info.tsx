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
  const { user } = data;
  const ratingColor = useRatingColor(user?.rating?.rating);

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
        <MediaLinks user={user} />
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
