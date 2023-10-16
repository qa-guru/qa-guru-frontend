import React from "react";
import { useParams } from "react-router-dom";
import {
  InputMaybe,
  Order,
  StudentHomeWorkSortField,
  useHomeWorksByLectureIdQuery,
  useUserIdQuery,
} from "api/graphql/generated/graphql";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import Spinner from "shared/components/spinner";
import HomeworksOtherStudents from "../../views/homeworks-other-students";
import { QUERY_DEFAULTS } from "../../constants/constants";

const HomeworksOtherStudentsContainer: React.FC = () => {
  const { lectureId } = useParams();

  const sortOptions = {
    field: "CREATION_DATE" as InputMaybe<StudentHomeWorkSortField>,
    order: "DESC" as InputMaybe<Order>,
  };

  const { data: dataUserId, loading: loadingUserId } = useUserIdQuery();
  const { data, loading, fetchMore } = useHomeWorksByLectureIdQuery({
    variables: {
      offset: QUERY_DEFAULTS.OFFSET,
      limit: QUERY_DEFAULTS.LIMIT,
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
