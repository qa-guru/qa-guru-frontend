import React from "react";
import { CircularProgress } from "@mui/material";
import { StyledGrid } from "./spinner.styled";

const Spinner: React.FC = () => {
  return (
    <StyledGrid container>
      <CircularProgress />
    </StyledGrid>
  );
};

export default Spinner;
