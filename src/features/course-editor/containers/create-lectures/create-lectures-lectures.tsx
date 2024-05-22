import { useTrainingLecturesQuery } from "api/graphql/generated/graphql";
import { FC } from "react";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { AppSpinner } from "shared/components/spinners";
import { useParams } from "react-router-dom";

import CreateLectures from "../../views/create-lectures";

const CreateLecturesContainer: FC = () => {
  const { trainingId } = useParams();

  const { data, loading: loadingTrainingLectures } = useTrainingLecturesQuery({
    variables: { id: trainingId! },
  });

  if (loadingTrainingLectures) return <AppSpinner />;

  if (!data) return <NoDataErrorMessage />;

  return <CreateLectures data={data} />;
};

export default CreateLecturesContainer;
