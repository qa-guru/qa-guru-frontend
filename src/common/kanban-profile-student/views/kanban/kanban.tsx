import { Typography } from "@mui/material";

import { Board } from "../../containers";
import { StyledContentBox } from "./kanban.styled";

const KanbanProfileStudent = () => {
  return (
    <StyledContentBox>
      <Typography variant="h5">Доска студента</Typography>
      <Board />
    </StyledContentBox>
  );
};

export default KanbanProfileStudent;
