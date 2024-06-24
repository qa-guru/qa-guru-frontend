import { Dispatch, SetStateAction } from "react";

export interface IEditDescription {
  description: (string | null)[];
  setDescription: Dispatch<SetStateAction<(string | null)[]>>;
}
