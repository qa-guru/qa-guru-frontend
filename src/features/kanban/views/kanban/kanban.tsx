import Form from "../form";
import { Board } from "../../containers";
import { KanbanFormContext } from "../../context/kanban-form-context";
import useKanbanFormState from "../../hooks/use-kanban-form-state";
import { StyledContentBox } from "./kanban.styled";

const Kanban = () => {
  const kanbanFormState = useKanbanFormState();

  return (
    <KanbanFormContext.Provider value={kanbanFormState}>
      <StyledContentBox>
        <Form />
        <Board />
      </StyledContentBox>
    </KanbanFormContext.Provider>
  );
};

export default Kanban;
