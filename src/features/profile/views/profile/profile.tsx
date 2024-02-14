import { FC } from "react";
import { Container } from "@mui/material";
import { useNavigate } from "react-router-dom";

import { IProfile } from "./profile.types";
import AvatarUpload from "../avatar-upload";
import { StyledButton, StyledButtonBox } from "./profile.styled";

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
      <AvatarUpload />
    </Container>
  );
};

export default Profile;
