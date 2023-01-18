import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import { useLectureHomeWorkQuery } from "../../../../generated/graphql";
import LectureHomework from "./LectureHomework";

const LectureHomeworkContainer: React.FC = () => {
  const { lessonId } = useParams();
  const { data, loading } = useLectureHomeWorkQuery({
    variables: { lectureId: lessonId! },
  });
  if (loading && !data) return <Spinner />;

  return <LectureHomework data={data!} />;
};

export default LectureHomeworkContainer;
