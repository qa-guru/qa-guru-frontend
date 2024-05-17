import {
  useDeleteLectureMutation,
  useTrainingLecturesQuery,
  useUpdateLectureMutation,
  useUpdateTrainingLectureMutation,
} from "api/graphql/generated/graphql";
import { FC } from "react";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { AppSpinner } from "shared/components/spinners";
import { useParams } from "react-router-dom";

import EditLectures from "../../views/edit-lectures";

const EditLecturesContainer: FC = () => {
  const { trainingId } = useParams();

  const [deleteLecture, { loading: loadingDeleteLecture }] =
    useDeleteLectureMutation();

  const [updatLecture, { loading: loadingUpdateLectureQuery }] =
    useUpdateLectureMutation();

  const [updateTrainingLecture, { loading: loadingUpdateTrainingLecture }] =
    useUpdateTrainingLectureMutation();

  const { data, loading: loadingTrainingLectures } = useTrainingLecturesQuery({
    variables: { id: trainingId! },
  });

  if (
    loadingUpdateTrainingLecture ||
    loadingTrainingLectures ||
    loadingUpdateLectureQuery ||
    loadingDeleteLecture
  )
    return <AppSpinner />;
  if (!data) return <NoDataErrorMessage />;

  return (
    <EditLectures
      data={data}
      updateTrainingLecture={updateTrainingLecture}
      updatLecture={updatLecture}
      deleteLecture={deleteLecture}
    />
  );
};

export default EditLecturesContainer;
