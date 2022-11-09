import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { nanoid } from "nanoid";
import "./Tasks.scss";
import { Task } from "./Task.types";
import { useLocalStorage } from "../../../../hooks/useLocalStorage";
import InputField from "../../ui/InputField/InputField";
import TodoNotAvaliable from "../../ui/TodoNotAvaliable/TodoNotAvaliable";
import TodoAvaliable from "../../ui/TodoAvaliable/TodoAvaliable";
import TodoApproved from "../../ui/TodoApproved/TodoApproved";

const Tasks: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [priority, setPriority] = useState<string>("low");
  const [todos, setTodos] = useLocalStorage<Task[]>("todos", []);
  const [inProgressTodos, setInProgressTodos] = useLocalStorage<Task[]>(
    "inprogress",
    []
  );
  const [completedTodos, setCompletedTodos] = useLocalStorage<Task[]>(
    "completed",
    []
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos([...todos, { id: nanoid(), todo, isDone: false, priority }]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    )
      return;
    let add: Task;
    let inbox = todos;
    let inprogress = inProgressTodos;
    let completed = completedTodos;

    if (source.droppableId === "inbox-column") {
      add = inbox[source.index];
      inbox.splice(source.index, 1);
    } else if (source.droppableId === "inprogress-column") {
      add = inprogress[source.index];
      inprogress.splice(source.index, 1);
    } else {
      add = completed[source.index];
      completed.splice(source.index, 1);
    }

    if (destination.droppableId === "inbox-column") {
      inbox.splice(destination.index, 0, { ...add, isDone: false });
    } else if (destination.droppableId === "inprogress-column") {
      inprogress.splice(destination.index, 0, { ...add, isDone: false });
    } else {
      completed.splice(destination.index, 0, { ...add, isDone: true });
    }

    setTodos(inbox);
    setInProgressTodos(inprogress);
    setCompletedTodos(completed);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="app">
        <div className="u-container -m0">
          <h1>Task Kanban</h1>
          {/*<InputField*/}
          {/*  todo={todo}*/}
          {/*  setTodo={setTodo}*/}
          {/*  setPriority={setPriority}*/}
          {/*  handleAdd={handleAdd}*/}
          {/*/>*/}
          <div className="kanban">
            <TodoNotAvaliable
              setTodos={setTodos}
              todos={todos}
              completedTodos={completedTodos}
              setCompletedTodos={setCompletedTodos}
            />
            <TodoAvaliable
              setTodos={setTodos}
              todos={todos}
              completedTodos={completedTodos}
              setCompletedTodos={setCompletedTodos}
              inProgressTodos={inProgressTodos}
              setInProgressTodos={setInProgressTodos}
            />
            <TodoApproved
              setTodos={setTodos}
              todos={todos}
              completedTodos={completedTodos}
              setCompletedTodos={setCompletedTodos}
            />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Tasks;
