import { Droppable } from "react-beautiful-dnd";
import TodoItem from "../TodoItem/TodoItem";
import { ITodoApproved } from "./TodoApproved.types";
import "./TodoApproved.scss";

const TodoApproved: React.FC<ITodoApproved> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="column">
      <h3>Approved</h3>
      <Droppable droppableId="completed-column">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ul className="todo-list -completed">
              {completedTodos.length === 0 ? (
                <p className="placeholder">There are no tasks yet</p>
              ) : (
                completedTodos.map((todo, index) => (
                  <TodoItem
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={completedTodos}
                    setTodos={setCompletedTodos}
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

export default TodoApproved;
