import { Typography } from "@mui/material";

import { Board } from "../../containers";
import { StyledContentBox } from "./kanban.styled";

const KanbanProfileMentor = () => {
  return (
    <StyledContentBox>
      <Typography variant="h5">Доска ментора</Typography>
      <Board />
    </StyledContentBox>
  );
};

export default KanbanProfileMentor;
