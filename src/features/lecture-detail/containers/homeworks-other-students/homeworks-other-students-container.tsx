import { FC, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  Order,
  StudentHomeWorkSortField,
  useHomeWorksByLectureIdQuery,
  useUserIdQuery,
} from "api/graphql/generated/graphql";
import NoDataErrorMessage from "shared/components/no-data-error-message";

import HomeworksOtherStudents from "../../views/homeworks-other-students";
import { QUERY_DEFAULTS } from "../../constants";
import { HomeworksOtherStudentsFormContext } from "../../context/homeworks-other-students-form-context";
import SkeletonHomeworks from "../../../../shared/components/skeletons/skeleton-homeworks/skeleton-homeworks";

const HomeworksOtherStudentsContainer: FC = () => {
  const { lectureId } = useParams();
  const { status, sortOrder } = useContext(HomeworksOtherStudentsFormContext);

  const sortOptions = {
    field: "CREATION_DATE" as StudentHomeWorkSortField,
    order: sortOrder || ("DESC" as Order),
  };

  const { data: dataUserId, loading: loadingUserId } = useUserIdQuery();

  const { data, loading, fetchMore } = useHomeWorksByLectureIdQuery({
    variables: {
      offset: QUERY_DEFAULTS.OFFSET,
      limit: QUERY_DEFAULTS.LIMIT,
      sort: sortOptions,
      filter: { status },
      lectureId: lectureId!,
    },
  });

  if (loading || loadingUserId) return <SkeletonHomeworks />;
  if (!data || !dataUserId || !lectureId) return <NoDataErrorMessage />;

  return (
    <HomeworksOtherStudents
      dataUserId={dataUserId}
      fetchMore={fetchMore}
      data={data}
    />
  );
};

export default HomeworksOtherStudentsContainer;
