import { FC } from "react";
import { CircularProgress } from "@mui/material";

import { StyledGrid } from "./app-spinner.styled";

const AppSpinner: FC = () => {
  return (
    <StyledGrid container>
      <CircularProgress />
    </StyledGrid>
  );
};

export default AppSpinner;
