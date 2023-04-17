import { createContext } from "react";

export interface ISelectedTrainingContext {
  selectedTrainingId: string | null;
  setSelectedTrainingId: (id: string | null) => void;
}

export const SelectedTrainingIdContext =
  createContext<ISelectedTrainingContext>({
    selectedTrainingId: null,
    setSelectedTrainingId: () => {},
  });
