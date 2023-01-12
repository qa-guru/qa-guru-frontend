import React, { FC } from "react";
import LectureDetail from "./LectureDetail";
import { useParams } from "react-router-dom";
import { useLectureQuery } from "../../api/graphql/lecture/lecture";
import Spinner from "../../shared/ui/Spinner/Spinner";

export const LectureDetailContainer: FC = () => {
  const { lessonId } = useParams();

  const { data, loading } = useLectureQuery({
    variables: { id: lessonId! },
  });

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);
  if (loading && !data) return <Spinner />;
  return <LectureDetail data={data!} />;
};
export default LectureDetailContainer;
