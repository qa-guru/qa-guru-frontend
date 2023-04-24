import React, { useContext } from "react";
import { ITrainingLecturesContainer } from "./TrainingLecturesContainer.types";
import { useTrainingLecturesQuery } from "../../../../api/graphql/trainingLecture/trainingLectures";
import LectureSelection from "../../KanbanView/components/Form/LectureSelection";
import { SelectedTrainingIdContext } from "../../../../context/SelectedTrainingIdContext";

const TrainingLecturesContainer: React.FC<ITrainingLecturesContainer> = ({
  control,
}) => {
  const { selectedTrainingId } = useContext(SelectedTrainingIdContext);

  const { data, loading } = useTrainingLecturesQuery({
    variables: { id: selectedTrainingId! },
    skip: !selectedTrainingId,
  });

  return <LectureSelection data={data!} control={control} />;
};

export default TrainingLecturesContainer;
