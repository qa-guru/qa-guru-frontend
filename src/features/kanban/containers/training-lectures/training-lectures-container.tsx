import React, { useContext } from "react";
import { useTrainingLecturesQuery } from "api/graphql/generated/graphql";
import { ITrainingLecturesContainer } from "./training-lectures-container.types";
import LectureSelection from "../../views/form/lecture-selection";
import { KanbanContext } from "../../context/kanban-context";

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
