import React from "react";
import { useParams } from "react-router-dom";
import LectureDetail from "./LectureDetail";
import Spinner from "../../shared/Spinner/Spinner";
import { useLectureQuery } from "../../api/graphql/lecture/lecture";
import NoDataErrorMessage from "../../shared/NoDataErrorMessage";
import {
  useHomeWorkByLectureQuery,
  useLectureHomeWorkQuery,
} from "../../api/graphql/generated/graphql";
import useTariff from "../../hooks/useTariff";

const LectureDetailContainer: React.FC = () => {
  const { lectureId } = useParams();
  const { trainingId } = useParams();
  const { hasHomework } = useTariff({ trainingId });

  const { data: dataLecture, loading: loadingLecture } = useLectureQuery({
    variables: { id: lectureId! },
  });

  const { data: dataLectureHomework, loading: loadingLectureHomeWork } =
    useLectureHomeWorkQuery({
      variables: { lectureId: lectureId! },
      skip: !hasHomework,
    });

  const { data: dataHomeWorkByLecture, loading: loadingHomework } =
    useHomeWorkByLectureQuery({
      variables: { lectureId: lectureId! },
      skip: !hasHomework || !dataLectureHomework?.lectureHomeWork?.length,
      fetchPolicy: "network-only",
    });

  if (loadingLecture || loadingHomework || loadingLectureHomeWork)
    return <Spinner />;

  if (!dataLecture) return <NoDataErrorMessage />;

  return (
    <LectureDetail
      dataLecture={dataLecture}
      dataLectureHomework={dataLectureHomework!}
      dataHomeWorkByLecture={dataHomeWorkByLecture!}
      hasHomework={hasHomework}
    />
  );
};

export default LectureDetailContainer;
