import { FC } from "react";
import { CircularProgress } from "@mui/material";

import { StyledGrid } from "../spinners.styled";

const AppSpinner: FC = () => {
  return (
    <StyledGrid container>
      <CircularProgress />
    </StyledGrid>
  );
};

export default AppSpinner;
