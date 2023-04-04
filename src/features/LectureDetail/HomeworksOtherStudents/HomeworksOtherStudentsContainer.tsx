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
import { useUserIdQuery } from "../../../api/graphql/user/userId";
import Spinner from "../../../shared/Spinner";

const HomeworksOtherStudentsContainer: React.FC = () => {
  const { lectureId } = useParams();
  const fieldSortHomeworks =
    "CREATION_DATE" as InputMaybe<StudentHomeWorkSortField>;
  const fieldOrderHomeworks = "DESC" as InputMaybe<Order>;

  const { data: dataUserId, loading: loadingUserId } = useUserIdQuery();
  const { data, loading, fetchMore } = useHomeWorksByLectureIdQuery({
    variables: {
      offset: 0,
      limit: 2,
      sort: {
        field: fieldSortHomeworks,
        order: fieldOrderHomeworks,
      },
      lectureId: lectureId!,
    },
  });

  if (loading || loadingUserId) return <Spinner />;
  if (!data || !dataUserId) return <NoDataErrorMessage />;

  return (
    <HomeworksOtherStudents
      dataUserId={dataUserId}
      fetchMore={fetchMore}
      data={data}
    />
  );
};

export default HomeworksOtherStudentsContainer;
