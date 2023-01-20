import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../shared/ui/Spinner/Spinner";
import { useLectureHomeWorkQuery } from "../../../generated/graphql";
import { useLectureQuery } from "../../../api/graphql/lecture/lecture";
import LectureDetail from "../ui/LectureDetail";

const LectureDetailContainer: React.FC = () => {
  const { lessonId } = useParams();

  const { data: dataLecture, loading: loadingLecture } = useLectureQuery({
    variables: { id: lessonId! },
  });

  const { data: dataLectureHomeWork, loading: loadingLectureHomeWork } =
    useLectureHomeWorkQuery({
      variables: { lectureId: lessonId! },
    });

  if (loadingLectureHomeWork && !dataLectureHomeWork) return <Spinner />;

  if (loadingLecture && !dataLecture) return <Spinner />;

  return (
    <LectureDetail
      dataLectureHomeWork={dataLectureHomeWork!}
      dataLecture={dataLecture!}
    />
  );
};

export default LectureDetailContainer;
