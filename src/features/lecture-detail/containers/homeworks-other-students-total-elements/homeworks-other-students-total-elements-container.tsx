import { FC, useContext } from "react";
import { useParams } from "react-router-dom";
import { useHomeWorksByLectureIdTotalElementsQuery } from "api/graphql/generated/graphql";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { HomeworksOtherStudentsTotalElementsSpinner } from "shared/components/spinners";

import { QUERY_DEFAULTS } from "../../constants";
import HomeworksOtherStudentsTotalElements from "../../views/homeworks-other-students-total-elements";
import { HomeworksOtherStudentsFormContext } from "../../context/homeworks-other-students-form-context";

const HomeworksOtherStudentsTotalElementsContainer: FC = () => {
  const { lectureId } = useParams();
  const { status } = useContext(HomeworksOtherStudentsFormContext);

  const { data, loading } = useHomeWorksByLectureIdTotalElementsQuery({
    variables: {
      offset: QUERY_DEFAULTS.OFFSET,
      limit: QUERY_DEFAULTS.LIMIT,
      filter: { status },
      lectureId: lectureId!,
    },
  });

  if (loading) return <HomeworksOtherStudentsTotalElementsSpinner />;
  if (!data || !lectureId) return <NoDataErrorMessage />;

  return <HomeworksOtherStudentsTotalElements data={data} />;
};

export default HomeworksOtherStudentsTotalElementsContainer;
