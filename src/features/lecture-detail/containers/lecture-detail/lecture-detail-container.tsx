import { FC, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import {
  useLectureHomeWorkQuery,
  useLectureQuery,
  useTrainingLecturesQuery,
} from "api/graphql/generated/graphql";
import { FETCH_POLICY } from "shared/constants";

import LectureDetail from "../../views/lecture-detail";
import useTariff from "../../hooks/use-tariff";

const LectureDetailContainer: FC = () => {
  const { lectureId, trainingId } = useParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const { tariffHomework } = useTariff({ trainingId });

  const { data: dataLecture, loading: loadingLecture } = useLectureQuery({
    variables: { id: lectureId! },
    fetchPolicy: FETCH_POLICY.CACHE_AND_NETWORK,
  });

  const { data: dataTrainingLectures, loading: loadingTrainingLectures } =
    useTrainingLecturesQuery({
      variables: { id: trainingId! },
      fetchPolicy: FETCH_POLICY.CACHE_AND_NETWORK,
    });

  const { data: dataLectureHomework, loading: loadingLectureHomeWork } =
    useLectureHomeWorkQuery({
      variables: { lectureId: lectureId! },
      skip: !tariffHomework,
      fetchPolicy: FETCH_POLICY.CACHE_AND_NETWORK,
    });

  useEffect(() => {
    if (dataTrainingLectures?.trainingLectures && lectureId) {
      const currentLecture = dataTrainingLectures.trainingLectures.find(
        (tl) => tl?.lecture?.id === lectureId
      );

      if (currentLecture) {
        const isLocked = currentLecture.locking;
        const {isAvailable} = currentLecture;

        if (isLocked || !isAvailable) {
          enqueueSnackbar("Этот урок пока недоступен", { variant: "warning" });
          navigate(`/training/${trainingId}`);
        }
      }
    }
  }, [dataTrainingLectures, lectureId, navigate, trainingId, enqueueSnackbar]);

  if (loadingLecture || loadingTrainingLectures) {
    return <AppSpinner />;
  }

  if (tariffHomework && loadingLectureHomeWork) {
    return <AppSpinner />;
  }

  if (!dataLecture || !lectureId || !dataTrainingLectures) {
    return <NoDataErrorMessage />;
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
