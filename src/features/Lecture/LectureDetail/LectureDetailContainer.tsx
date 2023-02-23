import React from "react";
import { useParams } from "react-router-dom";
import Spinner from "../../../shared/Spinner/Spinner";
import { useLectureQuery } from "../../../api/graphql/lecture/lecture";
import LectureDetail from "./LectureDetail";
import NoDataErrorMessage from "../../../shared/NoDataErrorMessage";

const LectureDetailContainer: React.FC = () => {
  const { lectureId } = useParams();
  const { data, loading } = useLectureQuery({
    variables: { id: lectureId! },
  });

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <LectureDetail data={data} />;
};

export default LectureDetailContainer;
