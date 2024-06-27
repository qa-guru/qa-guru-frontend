import {
  TrainingLecturesDocument,
  useUpdateLectureMutation,
  useUpdateTrainingLectureMutation,
} from "api/graphql/generated/graphql";
import { FC } from "react";
import { useParams } from "react-router-dom";

import CreateLecture from "../../views/create-lecture";

interface ICreateLectureContainer {
  lectureIds?: string[];
}

const CreateLectureContainer: FC<ICreateLectureContainer> = ({
  lectureIds,
}) => {
  const { trainingId } = useParams();

  const [updateTrainingLecture, { loading: loadingUpdateTrainingLecture }] =
    useUpdateTrainingLectureMutation({
      update: (cache, { data }) => {
        const newUpdateTrainingLecture = data?.updateTrainingLecture;

        cache.writeQuery({
          query: TrainingLecturesDocument,
          variables: {
            id: trainingId,
          },
          data: {
            trainingLectures: newUpdateTrainingLecture,
          },
        });
      },
    });

  const [updateLecture] = useUpdateLectureMutation();

  return (
    <CreateLecture
      updateLecture={updateLecture}
      updateTrainingLecture={updateTrainingLecture}
      lectureIds={lectureIds}
      loadingUpdateTrainingLecture={loadingUpdateTrainingLecture}
    />
  );
};

export default CreateLectureContainer;
