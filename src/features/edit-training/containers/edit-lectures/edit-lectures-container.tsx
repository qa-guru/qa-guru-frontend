import { useTrainingLecturesQuery } from "api/graphql/generated/graphql";
import { FC } from "react";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { useParams } from "react-router-dom";
import { AppSpinner } from "shared/components/spinners";

import TableColumns from "../../views/table-columns-training-lectures";

const EditLecturesContainer: FC = () => {
  const { trainingId } = useParams();

  const {
    data,
    loading: loadingTrainingLectures,
    fetchMore,
  } = useTrainingLecturesQuery({
    variables: { id: trainingId! },
  });

  if (loadingTrainingLectures) return <AppSpinner />;

  if (!data) return <NoDataErrorMessage />;

  return <TableColumns data={data} fetchMore={fetchMore} />;
};

export default EditLecturesContainer;
