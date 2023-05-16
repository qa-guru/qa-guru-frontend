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
  const [shouldSkipHomeWorks, setShouldSkipHomeWorks] =
    useState<boolean>(false);

  return {
    selectedTrainingId,
    setSelectedTrainingId,
    selectedLectureId,
    setSelectedLectureId,
    selectedCreationDateFrom,
    setSelectedCreationDateFrom,
    selectedCreationDateTo,
    setSelectedCreationDateTo,
    shouldSkipHomeWorks,
    setShouldSkipHomeWorks,
  };
};

export default useKanbanState;
