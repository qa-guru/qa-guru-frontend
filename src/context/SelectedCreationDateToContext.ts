import { createContext } from "react";

export interface ISelectedCreationDateToContext {
  selectedCreationDateTo: string | null;
  setSelectedCreationDateTo: (id: string | null) => void;
}

export const SelectedCreationDateToContext =
  createContext<ISelectedCreationDateToContext>({
    selectedCreationDateTo: null,
    setSelectedCreationDateTo: () => {},
  });
