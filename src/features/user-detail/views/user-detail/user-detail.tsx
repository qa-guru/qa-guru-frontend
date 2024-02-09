import { FC } from "react";
import { Container } from "@mui/material";

import { UserById } from "../../containers";

const UserDetail: FC = () => {
  return (
    <Container>
      <UserById />
    </Container>
  );
};

export default UserDetail;
