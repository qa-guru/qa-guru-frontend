import { FC } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KanbanProfileMentor from "shared/features/kanban-profile-mentor/views/kanban";
import KanbanProfileStudent from "shared/features/kanban-profile-student/views/kanban";
import { UserRole } from "api/graphql/generated/graphql";
import { useRoleAccess } from "shared/hooks";

import { StyledButton, StyledButtonBox } from "./profile.styled";
import { UserInfo } from "../../containers";

const Profile: FC = () => {
  const navigate = useNavigate();
  const routeEdit = () => navigate("/profile/edit");

  const hasStudentKanbanAccess = useRoleAccess({
    allowedRoles: [UserRole.Student],
  });

  const hasMentorKanbanAccess = useRoleAccess({
    allowedRoles: [UserRole.Mentor, UserRole.Lector],
  });

  return (
    <Container>
      <StyledButtonBox>
        <StyledButton variant="contained" color="primary" onClick={routeEdit}>
          Редактировать профиль
        </StyledButton>
      </StyledButtonBox>
      <UserInfo />
      {hasStudentKanbanAccess && <KanbanProfileStudent />}
      {hasMentorKanbanAccess && <KanbanProfileMentor />}
    </Container>
  );
};

export default Profile;
