import { createContext, Dispatch, SetStateAction } from "react";
import { Maybe } from "api/graphql/generated/graphql";

export interface IKanbanFormContext {
  trainingId: Maybe<string>;
  setTrainingId: Dispatch<SetStateAction<Maybe<string>>>;
  lectureId: Maybe<string>;
  setLectureId: Dispatch<SetStateAction<Maybe<string>>>;
  creationDateFrom: Maybe<string>;
  setCreationDateFrom: Dispatch<SetStateAction<Maybe<string>>>;
  creationDateTo: Maybe<string>;
  setCreationDateTo: Dispatch<SetStateAction<Maybe<string>>>;
  mentorId: Maybe<string>;
  setMentorId: Dispatch<SetStateAction<Maybe<string>>>;
}

export const KanbanFormContext = createContext<IKanbanFormContext>({
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
