import { Board } from "../../containers";
import { KanbanFormProvider } from "../../context/kanban-form-context";
import { StyledContentBox } from "./kanban.styled";

const Kanban = () => {
  return (
    <KanbanFormProvider>
      <StyledContentBox>
        <Board />
      </StyledContentBox>
    </KanbanFormProvider>
  );
};

export default Kanban;
