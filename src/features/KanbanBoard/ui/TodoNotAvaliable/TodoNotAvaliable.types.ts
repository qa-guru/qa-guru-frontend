import { Task } from "../../models/Tasks/Task.types";

export interface ITodoNotAvaliable {
  todos: Task[];
  setTodos: (s: Task[]) => void;
  completedTodos: Task[];
  setCompletedTodos: (s: Task[]) => void;
}
