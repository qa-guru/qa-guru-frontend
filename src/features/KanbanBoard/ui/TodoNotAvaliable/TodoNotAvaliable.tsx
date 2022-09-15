import { Droppable } from "react-beautiful-dnd";
import TodoItem from "../TodoItem/TodoItem";
import { ITodoNotAvaliable } from "./TodoNotAvaliable.types";
import "./TodoNotAvaliable.scss";

const TodoNotAvaliable: React.FC<ITodoNotAvaliable> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="column">
      <h3>Not avaliable</h3>
      <Droppable droppableId="inbox-column">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ul className="todo-list -inbox">
              {todos.length === 0 ? (
                <p className="placeholder">There are no tasks yet</p>
              ) : (
                todos.map((todo, index) => (
                  <TodoItem
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={todos}
                    setTodos={setTodos}
                    inbox={todos}
                    completed={completedTodos}
                    setInbox={setTodos}
                    setCompleted={setCompletedTodos}
                  />
                ))
              )}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoNotAvaliable;
