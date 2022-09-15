import React, { useState, useRef, useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import TodoItemCheckbox from "./TodoItemCheckbox/TodoItemCheckbox";
import TodoItemButton from "./TodoItemButton/TodoItemButton";
import TodoItemField from "./TodoItemField/TodoItemField";
import { ITodoItem } from "./TodoItem.types";
import "./TodoItem.scss";

const TodoItem: React.FC<ITodoItem> = ({
  index,
  todo,
  todos,
  setTodos,
  inbox,
  completed,
  setInbox,
  setCompleted,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleEdit = (e: React.FormEvent, id: string) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <form className="edit-form" onSubmit={(e) => handleEdit(e, todo.id)}>
            <TodoItemCheckbox
              todo={todo}
              setTodos={setTodos}
              setInbox={setInbox}
              setCompleted={setCompleted}
              completed={completed}
              todos={todos}
              inbox={inbox}
            />
            <TodoItemField
              todo={todo}
              todos={todos}
              setTodos={setTodos}
              edit={edit}
              setEdit={setEdit}
              setEditTodo={setEditTodo}
              editTodo={editTodo}
            />
            <TodoItemButton setTodos={setTodos} todos={todos} todo={todo} />
          </form>
        </li>
      )}
    </Draggable>
  );
};

export default TodoItem;
