import { FC } from "react";
import { useParams } from "react-router-dom";

import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useTrainingLecturesQuery } from "api/graphql/generated/graphql";
import { FETCH_POLICY } from "shared/constants";

import LectureSchedule from "../../views/lecture-schedule";

const LectureScheduleContainer: FC = () => {
  const { trainingId } = useParams();

  const { data, loading, refetch } = useTrainingLecturesQuery({
    variables: { id: trainingId! },
    fetchPolicy: FETCH_POLICY.NETWORK_ONLY,
  });

  if (loading) return <AppSpinner />;
  if (!data?.trainingLectures) return <NoDataErrorMessage />;

  return (
    <LectureSchedule
      trainingLectures={data.trainingLectures}
      refetch={refetch}
    />
  );
};

export default LectureScheduleContainer;
