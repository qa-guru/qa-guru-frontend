import React from "react";
import HomeworkDetailsFullpage from "features/kanban/views/homework-details-fullpage";
import {
  useHomeWorkQuery,
  useUserIdQuery,
} from "api/graphql/generated/graphql";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useParams } from "react-router-dom";

const HomeworkContainer: React.FC = () => {
  const { lectureId } = useParams();

  const { data: dataUserId, loading: loadingUserId } = useUserIdQuery();

  const { data, loading } = useHomeWorkQuery({
    variables: { homeWorkId: lectureId! },
  });

  if (loading || loadingUserId) return <Spinner />;

  if (!data || !dataUserId) return <NoDataErrorMessage />;

  return <HomeworkDetailsFullpage data={data} dataUserId={dataUserId} />;
};

export default HomeworkContainer;
