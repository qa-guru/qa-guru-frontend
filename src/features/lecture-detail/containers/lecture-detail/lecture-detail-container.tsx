import { FC } from "react";
import { useParams } from "react-router-dom";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import {
  useLectureHomeWorkQuery,
  useLectureQuery,
} from "api/graphql/generated/graphql";

import LectureDetail from "../../views/lecture-detail";
import useTariff from "../../hooks/use-tariff";

const LectureDetailContainer: FC = () => {
  const { lectureId, trainingId } = useParams();

  const { tariffHomework } = useTariff({ trainingId });

  const { data: dataLecture, loading: loadingLecture } = useLectureQuery({
    variables: { id: lectureId! },
  });

  const { data: dataLectureHomework, loading: loadingLectureHomeWork } =
    useLectureHomeWorkQuery({
      variables: { lectureId: lectureId! },
      skip: !tariffHomework,
    });

  if (loadingLecture || loadingLectureHomeWork || !tariffHomework)
    return <AppSpinner />;

  if (!dataLecture || !lectureId) return <NoDataErrorMessage />;

  return (
    <LectureDetail
      dataLecture={dataLecture}
      dataLectureHomework={dataLectureHomework}
      tariffHomework={tariffHomework}
    />
  );
};

export default LectureDetailContainer;
