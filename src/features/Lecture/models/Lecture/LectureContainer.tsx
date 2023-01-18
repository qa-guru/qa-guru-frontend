import React from "react";
import { useParams } from "react-router-dom";
import { useLectureQuery } from "../../../../api/graphql/lecture/lecture";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import Lecture from "./Lecture";

const LectureContainer: React.FC = () => {
  const { lessonId } = useParams();
  const { data, loading } = useLectureQuery({
    variables: { id: lessonId! },
  });

  if (loading && !data) return <Spinner />;

  return <Lecture data={data!} />;
};

export default LectureContainer;
