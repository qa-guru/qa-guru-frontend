import { Task } from "../../../models/Tasks/Task.types";

export interface ITodoItemButton {
  todo: Task;
  todos: Task[];
  setTodos: (s: Task[]) => void;
}
