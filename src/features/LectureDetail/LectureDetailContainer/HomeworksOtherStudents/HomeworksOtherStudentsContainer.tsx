import React from "react";
import { useParams } from "react-router-dom";
import {
  InputMaybe,
  Order,
  StudentHomeWorkSortField,
} from "../../../../api/graphql/generated/graphql";
import { useUserIdQuery } from "../../../../api/graphql/user/userId";
import HomeworksOtherStudents from "../../LectureDetailView/components/HomeworksOtherStudents";
import NoDataErrorMessage from "../../../../shared/NoDataErrorMessage";
import Spinner from "../../../../shared/Spinner";
import { useHomeWorksByLectureIdQuery } from "../../../../api/graphql/homework/homeWorksByLectureId";

const HomeworksOtherStudentsContainer: React.FC = () => {
  const { lectureId } = useParams();

  const sortOptions = {
    field: "CREATION_DATE" as InputMaybe<StudentHomeWorkSortField>,
    order: "DESC" as InputMaybe<Order>,
  };

  const { data: dataUserId, loading: loadingUserId } = useUserIdQuery();
  const { data, loading, fetchMore } = useHomeWorksByLectureIdQuery({
    variables: {
      offset: 0,
      limit: 2,
      sort: sortOptions,
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
