import { FC } from "react";
import { useParams } from "react-router-dom";

import { useHomeWorkByLectureAndTrainingQuery } from "api/graphql/generated/graphql";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { AppSpinner } from "shared/components/spinners";

import Homework from "../view";

interface HomeworkContainerProps {
  testGroup?: any;
  trainingId?: string;
  lectureId?: string;
}

const HomeworkContainer: FC<HomeworkContainerProps> = ({
  testGroup,
  trainingId,
  lectureId,
}) => {
  const params = useParams();
  const currentLectureId = lectureId || params.lectureId;
  const currentTrainingId = trainingId || params.trainingId;

  const {
    data: dataHomeWorkByLectureAndTraining,
    loading: loadingHomeWorkByLectureAndTraining,
  } = useHomeWorkByLectureAndTrainingQuery({
    variables: { lectureId: currentLectureId!, trainingId: currentTrainingId! },
    skip: !currentLectureId || !currentTrainingId,
  });

  if (loadingHomeWorkByLectureAndTraining) return <AppSpinner />;
  if (!dataHomeWorkByLectureAndTraining) return <NoDataErrorMessage />;

  return (
    <Homework
      dataHomeWorkByLectureAndTraining={
        dataHomeWorkByLectureAndTraining?.homeWorkByLectureAndTraining
      }
      testGroup={testGroup}
      trainingId={currentTrainingId}
      lectureId={currentLectureId}
    />
  );
};

export default HomeworkContainer;
