import React from "react";
import { StyledCircularProgress, StyledGrid } from "./spinner.styled";

const Spinner: React.FC = () => {
  return (
    <StyledGrid container>
      <StyledCircularProgress />
    </StyledGrid>
  );
};

export default Spinner;
