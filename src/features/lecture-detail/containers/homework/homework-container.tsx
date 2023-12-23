import { FC } from "react";
import {
  useHomeWorkByLectureAndTrainingQuery,
  useUserIdQuery,
} from "api/graphql/generated/graphql";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import Spinner from "shared/components/spinner";
import { useParams } from "react-router-dom";

import Homework from "../../views/homework";

const HomeworkContainer: FC = () => {
  const { lectureId, trainingId } = useParams();

  const { data: dataUserId, loading: loadingUserId } = useUserIdQuery();

  const {
    data: dataHomeWorkByLectureAndTraining,
    loading: loadingHomeWorkByLecture,
  } = useHomeWorkByLectureAndTrainingQuery({
    variables: { lectureId: lectureId!, trainingId: trainingId! },
    fetchPolicy: "cache-first",
  });

  if (loadingUserId || loadingHomeWorkByLecture) return <Spinner />;
  if (!dataUserId) return <NoDataErrorMessage />;

  return (
    <Homework
      dataHomeWorkByLectureAndTraining={
        dataHomeWorkByLectureAndTraining?.homeWorkByLectureAndTraining
      }
      dataUserId={dataUserId}
    />
  );
};

export default HomeworkContainer;
