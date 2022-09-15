import { Task } from "../../models/Tasks/Task.types";

export interface ITodoItem {
  index: number;
  todo: Task;
  todos: Task[];
  inbox: Task[];
  completed: Task[];
  setTodos: (s: Task[]) => void;
  setInbox: (s: Task[]) => void;
  setCompleted: (s: Task[]) => void;
}
