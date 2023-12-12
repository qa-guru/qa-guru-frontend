import Form from "../form";
import { Board } from "../../containers";
import { KanbanFormContext } from "../../context/kanban-form-context";
import useKanbanFormState from "../../hooks/use-kanban-form-state";

const Kanban = () => {
  const kanbanFormState = useKanbanFormState();

  return (
    <KanbanFormContext.Provider value={kanbanFormState}>
      <Form />
      <Board />
    </KanbanFormContext.Provider>
  );
};

export default Kanban;
