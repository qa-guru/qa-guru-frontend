import { useState } from "react";

const useKanbanFormState = () => {
  const [trainingId, setTrainingId] = useState<string | null>(null);
  const [lectureId, setLectureId] = useState<string | null>(null);
  const [creationDateFrom, setCreationDateFrom] = useState<string | null>(null);
  const [creationDateTo, setCreationDateTo] = useState<string | null>(null);
  const [mentorId, setMentorId] = useState<string | null>(null);

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
