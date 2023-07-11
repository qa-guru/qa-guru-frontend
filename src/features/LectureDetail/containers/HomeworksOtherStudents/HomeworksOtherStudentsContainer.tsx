import React from "react";
import { useParams } from "react-router-dom";
import {
  InputMaybe,
  Order,
  StudentHomeWorkSortField,
  useHomeWorksByLectureIdQuery,
  useUserIdQuery,
} from "../../../../api/graphql/generated/graphql";
import HomeworksOtherStudents from "../../views/HomeworksOtherStudents";
import NoDataErrorMessage from "../../../../shared/NoDataErrorMessage";
import Spinner from "../../../../shared/Spinner";

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
      limit: 3,
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
