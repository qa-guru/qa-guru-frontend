import { Control } from "react-hook-form";

export interface IRoleSelection {
  control: Control<{ filterValue: string }, unknown>;
}
