import React from "react";
import { useLectureHomeWorkQuery } from "../../../generated/graphql";
import { useParams } from "react-router-dom";
import Spinner from "../../../shared/Spinner";
import LectureHomework from "./LectureHomework";

const LectureHomeworkContainer: React.FC = () => {
  const { lectureId } = useParams();

  const { data, loading } = useLectureHomeWorkQuery({
    variables: { lectureId: lectureId! },
  });

  if (loading && !data) return <Spinner />;

  return <LectureHomework data={data} />;
};

export default LectureHomeworkContainer;
