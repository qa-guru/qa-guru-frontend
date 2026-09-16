import { FC } from "react";
import { useParams } from "react-router-dom";
import { Container } from "@mui/material";

import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import CatalogMissing from "shared/components/catalog-missing";
import {
  useLectureHomeWorkQuery,
  useLectureQuery,
  useTrainingLecturesQuery,
} from "api/graphql/generated/graphql";
import { FETCH_POLICY } from "shared/constants";
import { isLectureAccessible, isLectureEntityMissing } from "shared/helpers";

import LectureDetail from "../../views/lecture-detail";
import LectureGate from "../../views/lecture-gate";
import useTariff from "../../hooks/use-tariff";

const LectureDetailContainer: FC = () => {
  const { lectureId, trainingId } = useParams();

  const { tariffHomework } = useTariff({ trainingId });

  const { data: dataLecture, loading: loadingLecture } = useLectureQuery({
    variables: { id: lectureId! },
    fetchPolicy: FETCH_POLICY.CACHE_AND_NETWORK,
    errorPolicy: "all",
  });

  const { data: dataTrainingLectures, loading: loadingTrainingLectures } =
    useTrainingLecturesQuery({
      variables: { id: trainingId! },
      fetchPolicy: FETCH_POLICY.CACHE_AND_NETWORK,
    });

  const scheduleSlot = dataTrainingLectures?.trainingLectures?.find(
    (trainingLecture) => trainingLecture?.lecture?.id === lectureId
  );
  const skipHomework =
    !tariffHomework ||
    (scheduleSlot != null && !isLectureAccessible(scheduleSlot));

  const { data: dataLectureHomework, loading: loadingLectureHomeWork } =
    useLectureHomeWorkQuery({
      variables: { lectureId: lectureId! },
      skip: skipHomework,
      fetchPolicy: FETCH_POLICY.CACHE_AND_NETWORK,
    });

  if (loadingLecture || loadingTrainingLectures) {
    return <AppSpinner />;
  }

  if (tariffHomework && loadingLectureHomeWork && !skipHomework) {
    return <AppSpinner />;
  }

  if (!lectureId || !dataTrainingLectures) {
    return <NoDataErrorMessage />;
  }

  if (isLectureEntityMissing(dataLecture?.lecture, scheduleSlot)) {
    return <CatalogMissing kind="lecture" />;
  }

  if (!dataLecture?.lecture) {
    return (
      <Container>
        <LectureGate slot={scheduleSlot} lectureMissing />
      </Container>
    );
  }

  return (
    <LectureDetail
      dataLecture={dataLecture}
      dataTrainingLectures={dataTrainingLectures}
      dataLectureHomework={dataLectureHomework}
      tariffHomework={tariffHomework}
      trainingId={trainingId}
    />
  );
};

export default LectureDetailContainer;
