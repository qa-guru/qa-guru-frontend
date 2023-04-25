import React, { useContext } from "react";
import { ITrainingLecturesContainer } from "./TrainingLecturesContainer.types";
import { useTrainingLecturesQuery } from "../../../../api/graphql/trainingLecture/trainingLectures";
import LectureSelection from "../../views/Form/LectureSelection";
import { KanbanContext } from "../../context/KanbanContext";

const TrainingLecturesContainer: React.FC<ITrainingLecturesContainer> = ({
  control,
}) => {
  const { selectedTrainingId } = useContext(KanbanContext);

  const { data, loading } = useTrainingLecturesQuery({
    variables: { id: selectedTrainingId! },
    skip: !selectedTrainingId,
  });

  return <LectureSelection data={data!} control={control} />;
};

export default TrainingLecturesContainer;
