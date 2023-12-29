import { useState } from "react";
import { Maybe } from "api/graphql/generated/graphql";

const useKanbanFormState = () => {
  const [trainingId, setTrainingId] = useState<Maybe<string>>(null);
  const [lectureId, setLectureId] = useState<Maybe<string>>(null);
  const [creationDateFrom, setCreationDateFrom] = useState<Maybe<string>>(null);
  const [creationDateTo, setCreationDateTo] = useState<Maybe<string>>(null);
  const [mentorId, setMentorId] = useState<Maybe<string>>(null);

  return {
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
  };
};

export default useKanbanFormState;
