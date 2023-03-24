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
import { useUserQuery } from "../../../api/graphql/user/user";

const HomeworksOtherStudentsContainer: React.FC = () => {
  const { lectureId } = useParams();
  const fieldSortHomeworks =
    "CREATION_DATE" as InputMaybe<StudentHomeWorkSortField>;
  const fieldOrderHomeworks = "DESC" as InputMaybe<Order>;

  const { data, loading, fetchMore } = useHomeWorksByLectureIdQuery({
    variables: {
      offset: 0,
      limit: 1,
      sort: {
        field: fieldSortHomeworks,
        order: fieldOrderHomeworks,
      },
      lectureId: lectureId!,
    },
  });
  const { data: dataUser, loading: loadingUser } = useUserQuery();

  if (loading || loadingUser) return null;
  if (!data || !dataUser) return <NoDataErrorMessage />;

  return (
    <HomeworksOtherStudents
      fetchMore={fetchMore}
      data={data}
      dataUser={dataUser}
    />
  );
};

export default HomeworksOtherStudentsContainer;
