import { FC } from "react";
import { Container } from "@mui/material";

import { IProfile } from "./profile.types";
import AvatarUpload from "../avatar-upload";

const Profile: FC<IProfile> = () => {
  return (
    <Container>
      <AvatarUpload />
    </Container>
  );
};

export default Profile;
