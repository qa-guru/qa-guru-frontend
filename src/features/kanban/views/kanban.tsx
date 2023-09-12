import React from "react";
import Form from "./form";
import Board from "../containers/homeworks";
import { KanbanContext } from "../context/kanban-context";
import useKanbanState from "../hooks/use-kanban-state";

const Kanban = () => {
  const kanbanState = useKanbanState();

  return (
    <KanbanContext.Provider value={kanbanState}>
      <Form />
      <Board />
    </KanbanContext.Provider>
  );
};

export default Kanban;
