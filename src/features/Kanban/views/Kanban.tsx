import React from "react";
import Form from "./Form";
import Board from "../containers/Homeworks";
import { KanbanContext } from "../context/KanbanContext";
import useKanbanState from "../hooks/useKanbanState";

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
