import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Maybe } from "api/graphql/generated/graphql";

interface IKanbanFormProvider {
  children: ReactNode;
}

interface IKanbanFormContext {
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

export const useKanbanForm = () => {
  const context = useContext(KanbanFormContext);
  if (!context) {
    throw new Error("useKanbanForm must be used within a KanbanFormProvider");
  }
  return context;
};

export const KanbanFormProvider: FC<IKanbanFormProvider> = ({ children }) => {
  const [trainingId, setTrainingId] = useState<Maybe<string>>(null);
  const [lectureId, setLectureId] = useState<Maybe<string>>(null);
  const [creationDateFrom, setCreationDateFrom] = useState<Maybe<string>>(null);
  const [creationDateTo, setCreationDateTo] = useState<Maybe<string>>(null);
  const [mentorId, setMentorId] = useState<Maybe<string>>(null);

  return (
    <KanbanFormContext.Provider
      value={{
        trainingId,
        setTrainingId,
        lectureId,
        setLectureId,
        creationDateFrom,
        setCreationDateFrom,
        creationDateTo,
        setCreationDateTo,
        mentorId,
        setMentorId,
      }}
    >
      {children}
    </KanbanFormContext.Provider>
  );
};
