import { useTrainingQuery } from "api/graphql/generated/graphql";
import { CreateTrainingUpload } from "features/course-editor/views/create-training-upload";
import { FC } from "react";
import { useParams } from "react-router-dom";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { AppSpinner } from "shared/components/spinners";

const CreateTrainingUploadContainer: FC = () => {
  const { trainingId } = useParams();
  const { data, loading } = useTrainingQuery({
    variables: {
      id: trainingId!,
    },
  });

  if (loading) return <AppSpinner />;
  if (!data) return <NoDataErrorMessage />;

  return <CreateTrainingUpload data={data} />;
};

export default CreateTrainingUploadContainer;
