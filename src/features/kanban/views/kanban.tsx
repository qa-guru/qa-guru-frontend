import Form from "./form";
import Board from "../containers/homeworks";
import { KanbanFormContext } from "../context/kanban-form-context";
import useKanbanFormState from "../hooks/use-kanban-form-state";
import UserProvider from "../containers/user";

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
