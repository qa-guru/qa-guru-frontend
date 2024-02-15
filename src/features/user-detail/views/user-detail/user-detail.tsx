import { FC } from "react";
import UserInfo from "features/profile/views/user-info";
import { Container } from "@mui/material";

import { IUserDetail } from "./user-detail.types";

const UserDetail: FC<IUserDetail> = ({ data }) => {
  const { userById } = data;

  return (
    <Container>
      <UserInfo user={userById} />
    </Container>
  );
};

export default UserDetail;
