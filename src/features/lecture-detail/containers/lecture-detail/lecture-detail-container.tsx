import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import {
  useLectureHomeWorkQuery,
  useLectureQuery,
} from "api/graphql/generated/graphql";
import LectureDetail from "../../views";
import useTariff from "../../hooks/use-tariff";
import { LectureIdContext } from "../../context/lecture-id-context";

const LectureDetailContainer: React.FC = () => {
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

  if (loadingLecture || loadingLectureHomeWork) return <Spinner />;

  if (!dataLecture || !lectureId) return <NoDataErrorMessage />;

  return (
    <LectureIdContext.Provider value={lectureId}>
      <LectureDetail
        dataLecture={dataLecture}
        dataLectureHomework={dataLectureHomework!}
        tariffHomework={tariffHomework}
      />
    </LectureIdContext.Provider>
  );
};

export default LectureDetailContainer;
