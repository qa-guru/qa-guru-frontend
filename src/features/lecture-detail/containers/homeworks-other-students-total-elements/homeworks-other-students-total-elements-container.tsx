import { FC } from "react";
import { useParams } from "react-router-dom";
import { useHomeWorksByLectureIdTotalElementsQuery } from "api/graphql/generated/graphql";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import SkeletonTitle from "shared/components/skeletons/skeleton-title/skeleton-title";

import { QUERY_DEFAULTS } from "../../constants";
import HomeworksOtherStudentsTotalElements from "../../views/homeworks-other-students-total-elements";

const HomeworksOtherStudentsTotalElementsContainer: FC = () => {
  const { lectureId } = useParams();

  const { data, loading } = useHomeWorksByLectureIdTotalElementsQuery({
    variables: {
      offset: QUERY_DEFAULTS.OFFSET,
      limit: QUERY_DEFAULTS.LIMIT,
      lectureId: lectureId!,
    },
  });

  if (loading) return <SkeletonTitle />;
  if (!data || !lectureId) return <NoDataErrorMessage />;

  return <HomeworksOtherStudentsTotalElements data={data} />;
};

export default HomeworksOtherStudentsTotalElementsContainer;
