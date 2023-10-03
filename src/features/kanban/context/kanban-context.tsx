import { createContext, Dispatch, SetStateAction } from "react";

export interface IKanbanContext {
  trainingId: string | null;
  setTrainingId: Dispatch<SetStateAction<string | null>>;
  lectureId: string | null;
  setLectureId: Dispatch<SetStateAction<string | null>>;
  creationDateFrom: string | null;
  setCreationDateFrom: Dispatch<SetStateAction<string | null>>;
  creationDateTo: string | null;
  setCreationDateTo: Dispatch<SetStateAction<string | null>>;
  mentorId: string | null;
  setMentorId: Dispatch<SetStateAction<string | null>>;
}

export const KanbanContext = createContext<IKanbanContext>({
  trainingId: null,
  setTrainingId: () => {},
  lectureId: null,
  setLectureId: () => {},
  creationDateFrom: null,
  setCreationDateFrom: () => {},
  creationDateTo: null,
  setCreationDateTo: () => {},
  mentorId: null,
  setMentorId: () => {},
});
