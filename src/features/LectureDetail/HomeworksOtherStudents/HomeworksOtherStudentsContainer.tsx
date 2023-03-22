import React from "react";
import { useParams } from "react-router-dom";
import HomeworksOtherStudents from "./HomeworksOtherStudents";
import { useHomeWorksByLectureIdQuery } from "../../../api/graphql/homework/homeWorksByLectureId";
import {
  InputMaybe,
  Order,
  StudentHomeWorkSortField,
} from "../../../api/graphql/generated/graphql";
import NoDataErrorMessage from "../../../shared/NoDataErrorMessage";

const HomeworksOtherStudentsContainer: React.FC = () => {
  const { lectureId } = useParams();
  const fieldSortHomeworks =
    "CREATION_DATE" as InputMaybe<StudentHomeWorkSortField>;
  const fieldOrderHomeworks = "DESC" as InputMaybe<Order>;

  const { data, loading, fetchMore } = useHomeWorksByLectureIdQuery({
    variables: {
      offset: 0,
      limit: 3,
      sort: {
        field: fieldSortHomeworks,
        order: fieldOrderHomeworks,
      },
      lectureId: lectureId!,
    },
  });

  if (loading) return <div>Loading...</div>;
  if (!data) return <NoDataErrorMessage />;

  return <HomeworksOtherStudents data={data} />;
};

export default HomeworksOtherStudentsContainer;
