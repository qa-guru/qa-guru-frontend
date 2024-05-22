import { useTrainingLecturesQuery } from "api/graphql/generated/graphql";
import { FC } from "react";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useParams } from "react-router-dom";
import { AppSpinner } from "shared/components/spinners";

import EditLectures from "../../views/edit-lectures";

const EditLecturesContainer: FC = () => {
  const { trainingId } = useParams();

  const { data, loading: loadingTrainingLectures } = useTrainingLecturesQuery({
    variables: { id: trainingId! },
  });

  if (loadingTrainingLectures) return <AppSpinner />;

  if (!data) return <NoDataErrorMessage />;

  return <EditLectures data={data} />;
};

export default EditLecturesContainer;
