import { Droppable } from "react-beautiful-dnd";
import TodoItem from "../TodoItem/TodoItem";
import { ITodoAvaliable } from "./TodoAvaliable.types";
import "./TodoAvaliable.scss";

const TodoAvaliable: React.FC<ITodoAvaliable> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
  inProgressTodos,
  setInProgressTodos,
}) => {
  return (
    <div className="column">
      <h3>Avaliable</h3>
      <Droppable droppableId="inprogress-column">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ul className="todo-list -inprogress">
              {inProgressTodos.length === 0 ? (
                <p className="placeholder">There are no tasks yet</p>
              ) : (
                inProgressTodos.map((todo, index) => (
                  <TodoItem
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={inProgressTodos}
                    setTodos={setInProgressTodos}
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

export default TodoAvaliable;
