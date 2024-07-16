import { FC } from "react";
import { Container, Stack, Typography } from "@mui/material";
import { useRatingColor, useRoleAccess } from "shared/hooks";
import MediaLinks from "shared/components/media-links/media-links";
import KanbanProfileStudent from "shared/features/kanban-profile-student/views/kanban";
import KanbanProfileMentor from "shared/features/kanban-profile-mentor/views/kanban";
import AvatarUpload from "shared/components/avatar-upload";
import { UserRole } from "api/graphql/generated/graphql";
import UserInfoMobile from "shared/components/user-info/user-info-mobile";
import UserInfoDesktop from "shared/components/user-info/user-info-desktop";

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
    allowedRoles: [UserRole.Student],
  });

  const hasMentorKanbanAccess = useRoleAccess({
    roles,
    allowedRoles: [UserRole.Mentor, UserRole.Lector],
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
