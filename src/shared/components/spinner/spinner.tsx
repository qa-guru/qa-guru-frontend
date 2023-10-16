import { FC } from "react";
import { CircularProgress } from "@mui/material";
import { StyledGrid } from "./spinner.styled";

const Spinner: FC = () => {
  return (
    <StyledGrid container>
      <CircularProgress />
    </StyledGrid>
  );
};

export default Spinner;
