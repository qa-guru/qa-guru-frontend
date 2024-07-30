import { FC } from "react";
import { useParams } from "react-router-dom";

import { useHomeWorkQuery } from "api/graphql/generated/graphql";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";

import HomeworkDetailsFull from "../../views/homework-details-full";

const HomeworkContainer: FC = () => {
  const { lectureId } = useParams();

  const { data, loading } = useHomeWorkQuery({
    variables: { homeWorkId: lectureId! },
  });

  if (loading) return <AppSpinner />;

  if (!data) return <NoDataErrorMessage />;

  return <HomeworkDetailsFull data={data} />;
};

export default HomeworkContainer;
