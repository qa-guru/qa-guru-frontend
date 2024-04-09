import { Board } from "../../containers";
import { StyledContentBox } from "./kanban.styled";

const Kanban = () => {
  return (
    <StyledContentBox>
      <Board />
    </StyledContentBox>
  );
};

export default Kanban;
