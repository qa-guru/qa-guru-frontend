import React from "react";
import AllHomeworkAnswers from "./AllHomeworkAnswers";
import { useParams } from "react-router-dom";
import { useHomeWorksByLectureIdQuery } from "../../../api/graphql/homework/homeWorksByLectureId";
import Spinner from "../../../shared/Spinner";

const AllHomeworkAnswersContainer: React.FC = () => {
  const { lectureId } = useParams();

  const { data, loading } = useHomeWorksByLectureIdQuery({
    variables: {
      lectureId: lectureId!,
      page: 0,
      size: 5,
      sort: {},
    },
  });

  if (loading && !data) return <Spinner />;

  return <AllHomeworkAnswers data={data!} />;
};

export default AllHomeworkAnswersContainer;
