import { FC, useContext } from "react";
import { useTrainingLecturesQuery } from "api/graphql/generated/graphql";

import { ITrainingLecturesContainer } from "./training-lectures-container.types";
import LectureSelection from "../../views/lecture-selection";
import { KanbanFormContext } from "../../context/kanban-form-context";

const TrainingLecturesContainer: FC<ITrainingLecturesContainer> = ({
  control,
}) => {
  const { trainingId } = useContext(KanbanFormContext);

  const { data } = useTrainingLecturesQuery({
    variables: { id: trainingId! },
    skip: !trainingId,
  });

  return <LectureSelection {...{ data, control }} />;
};

export default TrainingLecturesContainer;
