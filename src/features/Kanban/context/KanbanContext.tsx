import { createContext, Dispatch, SetStateAction } from "react";

export interface IKanbanContext {
  selectedTrainingId: string | null;
  setSelectedTrainingId: Dispatch<SetStateAction<string | null>>;
  selectedLectureId: string | null;
  setSelectedLectureId: Dispatch<SetStateAction<string | null>>;
  selectedCreationDateFrom: string | null;
  setSelectedCreationDateFrom: Dispatch<SetStateAction<string | null>>;
  selectedCreationDateTo: string | null;
  setSelectedCreationDateTo: Dispatch<SetStateAction<string | null>>;
  selectedMentorId: string | null;
  setSelectedMentorId: Dispatch<SetStateAction<string | null>>;
}

export const KanbanContext = createContext<IKanbanContext>({
  selectedTrainingId: null,
  setSelectedTrainingId: () => {},
  selectedLectureId: null,
  setSelectedLectureId: () => {},
  selectedCreationDateFrom: null,
  setSelectedCreationDateFrom: () => {},
  selectedCreationDateTo: null,
  setSelectedCreationDateTo: () => {},
  selectedMentorId: null,
  setSelectedMentorId: () => {},
});
