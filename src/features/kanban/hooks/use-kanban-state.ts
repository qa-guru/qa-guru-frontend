import { useState } from "react";

const useKanbanState = () => {
  const [selectedTrainingId, setSelectedTrainingId] = useState<string | null>(
    null
  );
  const [selectedLectureId, setSelectedLectureId] = useState<string | null>(
    null
  );
  const [selectedCreationDateFrom, setSelectedCreationDateFrom] = useState<
    string | null
  >(null);
  const [selectedCreationDateTo, setSelectedCreationDateTo] = useState<
    string | null
  >(null);
  const [selectedMentorId, setSelectedMentorId] = useState<string | null>(null);
  const [selectedAssignToMe, setSelectedAssignToMe] = useState<string | null>(
    null
  );

  return {
    selectedTrainingId,
    setSelectedTrainingId,
    selectedLectureId,
    setSelectedLectureId,
    selectedCreationDateFrom,
    setSelectedCreationDateFrom,
    selectedCreationDateTo,
    setSelectedCreationDateTo,
    selectedMentorId,
    setSelectedMentorId,
    selectedAssignToMe,
    setSelectedAssignToMe,
  };
};

export default useKanbanState;
