import React, { useEffect, useRef } from "react";
import { ITodoItemField } from "./TodoItemField.types";
import "./TodoItemField.scss";

const TodoItemField: React.FC<ITodoItemField> = ({
  todo,
  todos,
  setTodos,
  edit,
  setEdit,
  setEditTodo,
  editTodo,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    textareaRef.current?.focus();
    if (textareaRef.current) {
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  const handleClickToEdit = () => {
    if (!edit && !todo.isDone) {
      setEdit(!edit);
    }
  };
  return (
    <>
      {edit ? (
        <textarea
          className="ctetextarea"
          ref={textareaRef}
          onChange={(e) => {
            e.target.style.height = e.target.scrollHeight + "px";
            setEditTodo(e.target.value);
          }}
          onBlur={(e) => handleEdit(e, todo.id)}
          value={editTodo}
        ></textarea>
      ) : (
        <span
          className={`ctetext${todo.isDone ? " -completed" : ""}`}
          onClick={handleClickToEdit}
        >
          {todo.todo}
        </span>
      )}
    </>
  );
};

export default TodoItemField;
