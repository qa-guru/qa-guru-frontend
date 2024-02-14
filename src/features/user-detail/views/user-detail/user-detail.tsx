import { FC } from "react";
import UserInfo from "features/profile/views/user-info";
import { Container } from "@mui/material";

import { IUserDetail } from "./user-detail.types";

const UserDetail: FC<IUserDetail> = ({ data, dataProfileById }) => {
  const { userById } = data;
  const { profileById } = dataProfileById;

  return (
    <Container>
      <UserInfo user={userById} profile={profileById} />
    </Container>
  );
};

export default UserDetail;
