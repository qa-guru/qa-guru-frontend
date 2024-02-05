import { FC } from "react";
import { Container } from "@mui/material";

import { IProfile } from "./profile.types";
import { UserInfo } from "../../containers";

const Profile: FC<IProfile> = () => {
  return (
    <Container>
      <UserInfo />
    </Container>
  );
};

export default Profile;
