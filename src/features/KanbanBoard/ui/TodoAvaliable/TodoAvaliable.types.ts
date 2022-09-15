import { Task } from "../../models/Tasks/Task.types";

export interface ITodoAvaliable {
  todos: Task[];
  setTodos: (s: Task[]) => void;
  inProgressTodos: Task[];
  setInProgressTodos: (s: Task[]) => void;
  completedTodos: Task[];
  setCompletedTodos: (s: Task[]) => void;
}
