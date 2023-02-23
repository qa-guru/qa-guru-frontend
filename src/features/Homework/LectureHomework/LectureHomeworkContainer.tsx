import React from "react";
import { useLectureHomeWorkQuery } from "../../../generated/graphql";
import { useParams } from "react-router-dom";
import Spinner from "../../../shared/Spinner/Spinner";
import LectureHomework from "./LectureHomework";
import NoDataErrorMessage from "../../../shared/NoDataErrorMessage";

const LectureHomeworkContainer: React.FC = () => {
  const { lectureId } = useParams();

  const { data, loading } = useLectureHomeWorkQuery({
    variables: { lectureId: lectureId! },
  });

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <LectureHomework data={data} />;
};

export default LectureHomeworkContainer;
