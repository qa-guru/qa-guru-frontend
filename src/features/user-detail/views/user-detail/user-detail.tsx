import { FC } from "react";
import { Container, Stack, Typography } from "@mui/material";
import useRatingColor from "shared/hooks/use-rating-color";
import MediaLinks from "shared/components/media-links/media-links";
import KanbanProfileStudent from "common/kanban-profile-student/views/kanban";
import KanbanProfileMentor from "common/kanban-profile-mentor/views/kanban";
import AvatarUpload from "shared/components/avatar-upload";
import { UserRole } from "api/graphql/generated/graphql";
import useRoleAccess from "shared/hooks/use-role-access";
import UserInfoMobile from "shared/user-info/user-info-mobile";
import UserInfoDesktop from "shared/user-info/user-info-desktop";

import {
  StyledColumnStack,
  StyledHiddenIconBox,
  StyledNameBox,
  StyledPaper,
  StyledRatingBox,
  StyledRowStack,
} from "./user-detail.styled";
import { IUserDetail } from "./user-detail.types";

const UserDetail: FC<IUserDetail> = ({ data }) => {
  const { rating, firstName, lastName, creationDate, roles } = data?.userById!;

  const user = data?.userById;
  const ratingColor = useRatingColor(rating?.rating);

  const hasStudentKanbanAccess = useRoleAccess({
    roles,
    allowedRoles: [UserRole.Student, UserRole.Admin],
  });

  const hasMentorKanbanAccess = useRoleAccess({
    roles,
    allowedRoles: [UserRole.Mentor, UserRole.Lector, UserRole.Admin],
  });

  return (
    <Container>
      <StyledPaper>
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
      {hasStudentKanbanAccess && <KanbanProfileStudent />}
      {hasMentorKanbanAccess && <KanbanProfileMentor />}
    </Container>
  );
};

export default UserDetail;
