import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../shared/Spinner";
import { useLectureHomeWorkQuery } from "../../../generated/graphql";
import { useLectureQuery } from "../../../api/graphql/lecture/lecture";
import LectureDetail from "./LectureDetail";
import { useSendHomeWorkToCheckMutation } from "../../../api/graphql/homework/sendHomeWorkToCheck";

const LectureDetailContainer: React.FC = () => {
  const { lessonId } = useParams();

  const { data: dataLecture, loading: loadingLecture } = useLectureQuery({
    variables: { id: lessonId! },
  });

  const { data: dataLectureHomeWork, loading: loadingLectureHomeWork } =
    useLectureHomeWorkQuery({
      variables: { lectureId: lessonId! },
    });

  const [sendHomeWorkToCheck, { loading: loadingSendHomeWorkToCheck }] =
    useSendHomeWorkToCheckMutation();

  if (loadingLectureHomeWork && !dataLectureHomeWork) return <Spinner />;

  if (loadingLecture && !dataLecture) return <Spinner />;

  return (
    <LectureDetail
      dataLectureHomeWork={dataLectureHomeWork!}
      dataLecture={dataLecture!}
      sendHomeWorkToCheck={sendHomeWorkToCheck}
      loadingSendHomeWorkToCheck={loadingSendHomeWorkToCheck}
    />
  );
};

export default LectureDetailContainer;
