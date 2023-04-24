import { createContext } from "react";

export interface ISelectedCreationDateFromContext {
  selectedCreationDateFrom: string | null;
  setSelectedCreationDateFrom: (id: string | null) => void;
}

export const SelectedCreationDateFromContext =
  createContext<ISelectedCreationDateFromContext>({
    selectedCreationDateFrom: null,
    setSelectedCreationDateFrom: () => {},
  });
