import React from "react";
import { Typography } from "@mui/material";
import Form from "./Form";
import Board from "../containers/Homeworks";
import { KanbanContext } from "../context/KanbanContext";
import useKanbanState from "../hooks/useKanbanState";

const Kanban = () => {
  const kanbanState = useKanbanState();

  return (
    <KanbanContext.Provider value={kanbanState}>
      <Typography variant="h4">Task Board</Typography>
      <Form />
      <Board />
    </KanbanContext.Provider>
  );
};

export default Kanban;
