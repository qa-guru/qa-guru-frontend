import { Task } from "../../../models/Tasks/Task.types";

export interface ITodoItemField {
  todo: Task;
  todos: Task[];
  setTodos: (s: Task[]) => void;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setEditTodo: React.Dispatch<React.SetStateAction<string>>;
  editTodo: string;
}
