import React, { useContext } from "react";
import { useTrainingLecturesQuery } from "../../../../api/graphql/trainingLecture/trainingLectures";
import Spinner from "../../../../shared/Spinner";
import NoDataErrorMessage from "../../../../shared/NoDataErrorMessage";
import LectureSelection from "../../KanbanView/components/LectureSelection";
import { SelectedTrainingIdContext } from "../../../../context/SelectedTrainingIdContext";

const TrainingLecturesContainer: React.FC = () => {
  const { selectedTrainingId } = useContext(SelectedTrainingIdContext);

  const { data, loading } = useTrainingLecturesQuery({
    variables: { id: selectedTrainingId! },
    skip: !selectedTrainingId,
  });

  if (loading) return <Spinner />;

  return <LectureSelection data={data!} />;
};

export default TrainingLecturesContainer;
