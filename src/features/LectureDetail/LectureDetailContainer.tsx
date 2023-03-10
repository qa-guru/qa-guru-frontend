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
import { useTrainingPurchasesQuery } from "../../api/graphql/trainingPurchase/trainingPurchases";

const LectureDetailContainer: React.FC = () => {
  const { lectureId } = useParams();
  const { data: dataLecture, loading: loadingLecture } = useLectureQuery({
    variables: { id: lectureId! },
  });
  const { data: dataHomeWorkByLecture, loading: loadingHomework } =
    useHomeWorkByLectureQuery({
      variables: { lectureId: lectureId! },
    });
  const { data: dataLectureHomework, loading: loadingLectureHomeWork } =
    useLectureHomeWorkQuery({
      variables: { lectureId: lectureId! },
    });

  if (loadingLecture || loadingHomework || loadingLectureHomeWork)
    return <Spinner />;

  if (!dataLecture) return <NoDataErrorMessage />;

  return (
    <LectureDetail
      dataLecture={dataLecture}
      dataHomeWorkByLecture={dataHomeWorkByLecture!}
      dataLectureHomework={dataLectureHomework!}
    />
  );
};

export default LectureDetailContainer;
