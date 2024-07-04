import { FC } from "react";
import {
  Maybe,
  TrainingLecturesDocument,
  useUpdateTrainingLectureMutation,
} from "api/graphql/generated/graphql";

import AddLecture from "../../views/add-lecture";

interface IAddLectureContainer {
  lectureIds?: string[];
  selectedLectureId?: Maybe<string>;
  trainingId?: string;
}

const AddLectureContainer: FC<IAddLectureContainer> = ({
  lectureIds,
  selectedLectureId,
  trainingId,
}) => {
  const [updateTrainingLecture, { loading: loadingUpdateTrainingLecture }] =
    useUpdateTrainingLectureMutation({
      update: (cache, { data }) => {
        const newUpdateTrainingLecture = data?.updateTrainingLecture;

        cache.writeQuery({
          query: TrainingLecturesDocument,
          variables: { id: trainingId! },
          data: {
            trainingLectures: newUpdateTrainingLecture,
          },
        });
      },
    });

  return (
    <AddLecture
      updateTrainingLecture={updateTrainingLecture}
      lectureIds={lectureIds}
      loadingUpdateTrainingLecture={loadingUpdateTrainingLecture}
      selectedLectureId={selectedLectureId}
      trainingId={trainingId}
    />
  );
};

export default AddLectureContainer;
