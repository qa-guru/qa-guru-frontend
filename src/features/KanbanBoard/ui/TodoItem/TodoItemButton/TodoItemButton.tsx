import React from "react";
import { FiX } from "react-icons/fi";
import { ITodoItemButton } from "./TodoItemButton.types";
import "./TodoItemButton.scss";

const TodoItemButton: React.FC<ITodoItemButton> = ({
  setTodos,
  todos,
  todo,
}) => {
  const handleDelete = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  return (
    <button
      type="button"
      className="deletebtn"
      onClick={() => handleDelete(todo.id)}
    >
      <FiX />
    </button>
  );
};

export default TodoItemButton;
