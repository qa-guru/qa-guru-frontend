import { FC } from "react";
import { Container } from "@mui/material";

import RatingInfo from "../rating-info";
import RoleInfo from "../role-info";
import { StyledTitle } from "./info-system.styled";

const InfoSystem: FC = () => {
  return (
    <Container>
      <StyledTitle variant="h2">Наша система</StyledTitle>
      <RatingInfo />
      <RoleInfo />
    </Container>
  );
};

export default InfoSystem;
