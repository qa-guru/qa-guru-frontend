import { FC, useContext } from "react";
import { useTrainingLecturesQuery } from "api/graphql/generated/graphql";
import { ITrainingLecturesContainer } from "./training-lectures-container.types";
import LectureSelection from "../../views/form/lecture-selection";
import { KanbanFormContext } from "../../context/kanban-form-context";
import NoDataErrorMessage from "../../../../shared/components/no-data-error-message";

const TrainingLecturesContainer: FC<ITrainingLecturesContainer> = ({
  control,
}) => {
  const { trainingId } = useContext(KanbanFormContext);

  const { data } = useTrainingLecturesQuery({
    variables: { id: trainingId! },
    skip: !trainingId,
  });

  if (!data) return <NoDataErrorMessage />;

  return <LectureSelection data={data} control={control} />;
};

export default TrainingLecturesContainer;
