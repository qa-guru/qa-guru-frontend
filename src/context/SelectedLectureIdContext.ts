import { createContext } from "react";

export interface ISelectedLectureContext {
  selectedLectureId: string | null;
  setSelectedLectureId: (id: string | null) => void;
}

export const SelectedLectureIdContext = createContext<ISelectedLectureContext>({
  selectedLectureId: null,
  setSelectedLectureId: () => {},
});
