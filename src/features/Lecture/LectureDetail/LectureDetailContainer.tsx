import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../shared/Spinner";
import { useLectureQuery } from "../../../api/graphql/lecture/lecture";
import LectureDetail from "./LectureDetail";

const LectureDetailContainer: React.FC = () => {
  const { lectureId } = useParams();
  const { data: dataLecture, loading: loadingLecture } = useLectureQuery({
    variables: { id: lectureId! },
  });

  if (loadingLecture && !dataLecture) return <Spinner />;

  return <LectureDetail dataLecture={dataLecture!} />;
};

export default LectureDetailContainer;
