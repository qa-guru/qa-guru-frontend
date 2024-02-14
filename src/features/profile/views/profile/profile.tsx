import { FC } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { IProfile } from "./profile.types";
import { StyledButton, StyledButtonBox } from "./profile.styled";
import { UserInfo } from "../../containers";

const Profile: FC<IProfile> = () => {
  const navigate = useNavigate();
  const routeEdit = () => navigate("/profile/edit");

  return (
    <Container>
      <StyledButtonBox>
        <StyledButton variant="contained" color="primary" onClick={routeEdit}>
          Редактировать профиль
        </StyledButton>
      </StyledButtonBox>
      <UserInfo />
    </Container>
  );
};

export default Profile;
