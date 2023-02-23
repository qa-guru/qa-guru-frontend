import React from "react";
import AllHomework from "./AllHomework";
import { useParams } from "react-router-dom";
import { useHomeWorksByLectureIdQuery } from "../../../api/graphql/homework/homeWorksByLectureId";
import Spinner from "../../../shared/Spinner/Spinner";
import NoDataErrorMessage from "../../../shared/NoDataErrorMessage";

const AllHomeworkContainer: React.FC = () => {
  const { lectureId } = useParams();

  const { data, loading } = useHomeWorksByLectureIdQuery({
    variables: {
      lectureId: lectureId!,
      page: 0,
      size: 5,
      sort: {},
    },
  });

  if (loading) return <Spinner />;
  if (!data) return <NoDataErrorMessage />;

  return <AllHomework data={data} />;
};

export default AllHomeworkContainer;
