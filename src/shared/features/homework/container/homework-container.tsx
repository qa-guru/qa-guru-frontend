import { FC } from "react";
import { useHomeWorkByLectureAndTrainingQuery } from "api/graphql/generated/graphql";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { AppSpinner } from "shared/components/spinners";
import { useParams } from "react-router-dom";

import Homework from "../view";

const HomeworkContainer: FC = () => {
  const { lectureId, trainingId } = useParams();

  const {
    data: dataHomeWorkByLectureAndTraining,
    loading: loadingHomeWorkByLectureAndTraining,
  } = useHomeWorkByLectureAndTrainingQuery({
    variables: { lectureId: lectureId!, trainingId: trainingId! },
  });

  if (loadingHomeWorkByLectureAndTraining) return <AppSpinner />;
  if (!dataHomeWorkByLectureAndTraining) return <NoDataErrorMessage />;

  return (
    <Homework
      dataHomeWorkByLectureAndTraining={
        dataHomeWorkByLectureAndTraining?.homeWorkByLectureAndTraining
      }
    />
  );
};

export default HomeworkContainer;
