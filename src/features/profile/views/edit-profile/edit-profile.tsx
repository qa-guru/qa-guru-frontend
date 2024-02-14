import { FC } from "react";
import { Container } from "@mui/material";

import { IEditProfile } from "./edit-profile.types";
import AvatarUpload from "../avatar-upload";

const EditProfile: FC<IEditProfile> = () => {
  return (
    <Container>
      <AvatarUpload />
    </Container>
  );
};

export default EditProfile;
