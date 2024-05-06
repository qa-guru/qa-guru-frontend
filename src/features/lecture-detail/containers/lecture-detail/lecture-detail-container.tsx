import { FC } from "react";
import { useParams } from "react-router-dom";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import {
  useLectureHomeWorkQuery,
  useLectureQuery,
  useTrainingLecturesQuery,
  useTrainingQuery, // Import the query for fetching all lectures in a training
} from "api/graphql/generated/graphql";

import LectureDetail from "../../views/lecture-detail";
import useTariff from "../../hooks/use-tariff";

const LectureDetailContainer: FC = () => {
  const { lectureId, trainingId } = useParams();

  const { tariffHomework } = useTariff({ trainingId });

  const { data: dataLecture, loading: loadingLecture } = useLectureQuery({
    variables: { id: lectureId! },
  });

  const { data: dataTrainingLectures, loading: loadingTrainingLectures } =
    useTrainingLecturesQuery({
      variables: { id: trainingId! },
    });

  const { data: dataTraining, loading: loadingTraining } = useTrainingQuery({
    variables: { id: trainingId! },
  });

  const { data: dataLectureHomework, loading: loadingLectureHomeWork } =
    useLectureHomeWorkQuery({
      variables: { lectureId: lectureId! },
      skip: !tariffHomework,
    });

  if (
    loadingLecture ||
    loadingLectureHomeWork ||
    loadingTrainingLectures ||
    !tariffHomework
  )
    return <AppSpinner />;

  if (!dataLecture || !lectureId || !dataTrainingLectures)
    return <NoDataErrorMessage />;

  return (
    <LectureDetail
      dataLecture={dataLecture}
      dataTrainingLectures={dataTrainingLectures}
      dataTraining={dataTraining}
      dataLectureHomework={dataLectureHomework}
      tariffHomework={tariffHomework}
      trainingId={trainingId}
    />
  );
};

export default LectureDetailContainer;
