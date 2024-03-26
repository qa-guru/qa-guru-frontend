import { FC } from "react";
import {
  useHomeWorkQuery,
  useUserIdQuery,
} from "api/graphql/generated/graphql";
import AppSpinner from "shared/components/spinners/app-spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useParams } from "react-router-dom";

import HomeworkDetailsFull from "../../views/homework-details-full";

const HomeworkContainer: FC = () => {
  const { lectureId } = useParams();

  const { data: dataUserId, loading: loadingUserId } = useUserIdQuery();

  const { data, loading } = useHomeWorkQuery({
    variables: { homeWorkId: lectureId! },
  });

  if (loading || loadingUserId) return <AppSpinner />;

  if (!data || !dataUserId) return <NoDataErrorMessage />;

  return <HomeworkDetailsFull data={data} dataUserId={dataUserId} />;
};

export default HomeworkContainer;
