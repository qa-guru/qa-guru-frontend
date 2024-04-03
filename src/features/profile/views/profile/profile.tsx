import { FC } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KanbanProfileMentor from "features/kanban-profile-mentor/views/kanban";
import { UserRole } from "api/graphql/generated/graphql";
import useRoleAccess from "shared/hooks/use-role-access";

import { IProfile } from "./profile.types";
import { StyledButton, StyledButtonBox } from "./profile.styled";
import { UserInfo } from "../../containers";

const Profile: FC<IProfile> = () => {
  const navigate = useNavigate();
  const routeEdit = () => navigate("/profile/edit");

  const hasMentorKanbanAccess = useRoleAccess({
    allowedRoles: [UserRole.Mentor],
  });

  return (
    <Container>
      <StyledButtonBox>
        <StyledButton variant="contained" color="primary" onClick={routeEdit}>
          Редактировать профиль
        </StyledButton>
      </StyledButtonBox>
      <UserInfo />
      {hasMentorKanbanAccess && <KanbanProfileMentor />}
    </Container>
  );
};

export default Profile;
