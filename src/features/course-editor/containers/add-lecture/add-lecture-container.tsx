import {
  TrainingLecturesDocument,
  useUpdateLectureMutation,
  useUpdateTrainingLectureMutation,
} from "api/graphql/generated/graphql";
import { FC } from "react";
import { useParams } from "react-router-dom";

import AddLecture from "../../views/add-lecture";

interface IAddLectureContainer {
  lectureIds?: string[];
}

const AddLectureContainer: FC<IAddLectureContainer> = ({ lectureIds }) => {
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
    <AddLecture
      updateLecture={updateLecture}
      updateTrainingLecture={updateTrainingLecture}
      lectureIds={lectureIds}
      loadingUpdateTrainingLecture={loadingUpdateTrainingLecture}
    />
  );
};

export default AddLectureContainer;
