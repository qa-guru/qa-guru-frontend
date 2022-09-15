import React from "react";
import { BsFillCheckSquareFill, BsSquare } from "react-icons/bs";
import { ITodoItemCheckbox } from "./TodoItemCheckbox.types";
import "./TodoItemCheckbox.scss";

const TodoItemCheckbox: React.FC<ITodoItemCheckbox> = ({
  todo,
  setTodos,
  setInbox,
  setCompleted,
  completed,
  todos,
  inbox,
}) => {
  const handleDone = (id: string) => {
    if (todo.isDone) {
      setTodos(todos.filter((todo) => todo.id !== id));
      setInbox([...inbox, { ...todo, isDone: false }]);
    } else {
      setTodos(todos.filter((todo) => todo.id !== id));
      setCompleted([...completed, { ...todo, isDone: true }]);
    }
  };

  return (
    <>
      <input
        type="checkbox"
        className="customcheckbox"
        checked={todo.isDone}
        onChange={() => handleDone(todo.id)}
      />
      <span
        className={`checkmark -${todo.priority}`}
        onClick={() => handleDone(todo.id)}
      >
        {todo.isDone ? <BsFillCheckSquareFill /> : <BsSquare />}
      </span>
    </>
  );
};

export default TodoItemCheckbox;
