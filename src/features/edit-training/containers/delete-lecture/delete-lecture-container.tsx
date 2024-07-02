import { FC } from "react";
import {
  Maybe,
  useDeleteLectureMutation,
  useUpdateTrainingLectureMutation,
} from "api/graphql/generated/graphql";
import { useParams } from "react-router-dom";

import DeleteLecture from "../../views/delete-lecture";

interface IDeleteLectureContainer {
  lectureId?: Maybe<string>;
  lectureIds?: string[];
}

const DeleteLectureContainer: FC<IDeleteLectureContainer> = ({
  lectureId,
  lectureIds,
}) => {
  const { trainingId } = useParams();

  const [updateTrainingLecture, { loading: loadingUpdateTrainingLecture }] =
    useUpdateTrainingLectureMutation();

  const [deleteLecture] = useDeleteLectureMutation({
    // update: (cache) => {
    //   const existingTrainingLectures: Maybe<TrainingLecturesQuery> =
    //     cache.readQuery({
    //       query: TrainingLecturesDocument,
    //       variables: {
    //         id: trainingId,
    //       },
    //     });
    //   const updateTrainingLectures =
    //     existingTrainingLectures?.trainingLectures?.filter(
    //       (trainingLecture) => trainingLecture?.lecture?.id !== lectureId
    //     );
    //   cache.writeQuery({
    //     query: TrainingLecturesDocument,
    //     variables: {
    //       id: trainingId,
    //     },
    //     data: {
    //       trainingLectures: updateTrainingLectures,
    //     },
    //   });
    // },
  });

  return (
    <DeleteLecture
      deleteLecture={deleteLecture}
      loadingUpdateTrainingLecture={loadingUpdateTrainingLecture}
      lectureIds={lectureIds}
      updateTrainingLecture={updateTrainingLecture}
      lectureId={lectureId}
    />
  );
};

export default DeleteLectureContainer;
