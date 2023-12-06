import Form from "../form";
import { Board, UserProvider } from "../../containers";
import { KanbanFormContext } from "../../context/kanban-form-context";
import useKanbanFormState from "../../hooks/use-kanban-form-state";

const Kanban = () => {
  const kanbanFormState = useKanbanFormState();

  return (
    <KanbanFormContext.Provider value={kanbanFormState}>
      <UserProvider>
        <Form />
        <Board />
      </UserProvider>
    </KanbanFormContext.Provider>
  );
};

export default Kanban;
