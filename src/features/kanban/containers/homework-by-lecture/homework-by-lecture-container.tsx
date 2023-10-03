import React from "react";
import HomeworkDescriptionFullpage from "features/kanban/views/homework-description-fullpage";
import { useHomeWorkQuery } from "api/graphql/generated/graphql";
import Spinner from "shared/components/spinner";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useParams } from "react-router-dom";

const HomeworkByLectureContainer: React.FC = () => {
  const { lectureId } = useParams();

  const { data, loading } = useHomeWorkQuery({
    variables: { homeWorkId: lectureId! },
  });

  if (loading) return <Spinner />;

  if (!data) return <NoDataErrorMessage />;

  return <HomeworkDescriptionFullpage data={data} />;
};

export default HomeworkByLectureContainer;
