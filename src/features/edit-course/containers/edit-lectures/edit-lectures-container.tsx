import { useTrainingLecturesQuery } from "api/graphql/generated/graphql";
import { FC } from "react";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { AppSpinner } from "shared/components/spinners";
import { useParams } from "react-router-dom";

import EditLectures from "../../views/edit-lectures";

const EditLecturesContainer: FC = () => {
  const { trainingId } = useParams();

  const { data, loading } = useTrainingLecturesQuery({
    variables: { id: trainingId! },
  });

  if (loading) return <AppSpinner />;
  if (!data) return <NoDataErrorMessage />;

  return <EditLectures data={data} />;
};

export default EditLecturesContainer;
