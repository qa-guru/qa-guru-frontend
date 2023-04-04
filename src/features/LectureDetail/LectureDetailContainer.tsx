import React from "react";
import { useParams } from "react-router-dom";
import LectureDetail from "./LectureDetail";
import Spinner from "../../shared/Spinner";
import { useLectureQuery } from "../../api/graphql/lecture/lecture";
import NoDataErrorMessage from "../../shared/NoDataErrorMessage";
import useTariff from "../../hooks/useTariff";
import { LectureIdContext } from "../../context/LectureIdContext";
import { useLectureHomeWorkQuery } from "../../api/graphql/lecture/lectureHomeWork";

const LectureDetailContainer: React.FC = () => {
  const { lectureId } = useParams();
  const { trainingId } = useParams();
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
