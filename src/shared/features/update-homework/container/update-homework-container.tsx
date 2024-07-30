import { FC } from "react";
import { useParams } from "react-router-dom";

import {
  HomeWorkByLectureAndTrainingDocument,
  HomeWorkByLectureAndTrainingQuery,
  Maybe,
  useUpdateHomeworkMutation,
} from "api/graphql/generated/graphql";

import { IUpdateHomeworkContainer } from "./update-homework-container.types";
import UpdateHomework from "../view";

const UpdateHomeworkContainer: FC<IUpdateHomeworkContainer> = ({
  setOpenHomeWorkEdit,
  answer,
  id,
}) => {
  const { lectureId, trainingId } = useParams();

  const [updateHomework, { loading }] = useUpdateHomeworkMutation({
    update: (cache, { data }) => {
      const newUpdateHomework = data?.updateHomeWork;

      const existingHomeWorkByLectureAndTraining: Maybe<HomeWorkByLectureAndTrainingQuery> =
        cache.readQuery({
          query: HomeWorkByLectureAndTrainingDocument,
          variables: { lectureId: lectureId!, trainingId: trainingId! },
        });

      const updatedHomeWorkByLectureAndTraining = {
        homeWorkByLectureAndTraining: {
          ...existingHomeWorkByLectureAndTraining?.homeWorkByLectureAndTraining,
          answer: newUpdateHomework?.answer,
        },
      };

      cache.writeQuery({
        query: HomeWorkByLectureAndTrainingDocument,
        variables: { lectureId: lectureId!, trainingId: trainingId! },
        data: updatedHomeWorkByLectureAndTraining,
      });
    },
  });

  return (
    <UpdateHomework
      setOpenHomeWorkEdit={setOpenHomeWorkEdit}
      loading={loading}
      updateHomework={updateHomework}
      answer={answer}
      id={id}
    />
  );
};

export default UpdateHomeworkContainer;
