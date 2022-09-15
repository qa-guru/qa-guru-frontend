import { Task } from "../../../models/Tasks/Task.types";

export interface ITodoItemCheckbox {
  todo: Task;
  todos: Task[];
  inbox: Task[];
  completed: Task[];
  setTodos: (s: Task[]) => void;
  setInbox: (s: Task[]) => void;
  setCompleted: (s: Task[]) => void;
}
