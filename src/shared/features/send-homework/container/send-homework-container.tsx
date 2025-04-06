import { FC } from "react";
import { useParams } from "react-router-dom";

import {
  HomeWorkByLectureAndTrainingDocument,
  HomeWorkByLectureAndTrainingQuery,
  Maybe,
  useCreateHomeWorkToCheckMutation,
  useSendHomeWorkToCheckMutation,
  useUpdateHomeworkMutation,
} from "api/graphql/generated/graphql";

import SendHomework from "../view";

const SendHomeworkContainer: FC = () => {
  const { lectureId, trainingId } = useParams();

  const [createHomeWorkToCheck, { loading: loadingCreateHomeWorkToCheck }] =
    useCreateHomeWorkToCheckMutation({
      update: (cache, { data }) => {
        const newCreateHomeWorkToCheck = data?.createHomeWorkToCheck;

        const existingHomeWorkByLectureAndTraining: Maybe<HomeWorkByLectureAndTrainingQuery> =
          cache.readQuery({
            query: HomeWorkByLectureAndTrainingDocument,
            variables: { lectureId: lectureId!, trainingId: trainingId! },
          });

        const updatedHomeWorkByLectureAndTraining = {
          homeWorkByLectureAndTraining: {
            ...existingHomeWorkByLectureAndTraining?.homeWorkByLectureAndTraining,
            ...newCreateHomeWorkToCheck,
          },
        };

        cache.writeQuery({
          query: HomeWorkByLectureAndTrainingDocument,
          variables: { lectureId: lectureId!, trainingId: trainingId! },
          data: updatedHomeWorkByLectureAndTraining,
        });
      },
    });

  const [updateHomework, { loading: loadingUpdateHomework }] =
    useUpdateHomeworkMutation({
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
            ...newUpdateHomework,
          },
        };

        cache.writeQuery({
          query: HomeWorkByLectureAndTrainingDocument,
          variables: { lectureId: lectureId!, trainingId: trainingId! },
          data: updatedHomeWorkByLectureAndTraining,
        });
      },
    });

  const [sendHomeWorkToCheck, { loading: loadingSendHomeWorkToCheck }] =
    useSendHomeWorkToCheckMutation();

  return (
    <SendHomework
      loadingCreateHomeWorkToCheck={loadingCreateHomeWorkToCheck}
      loadingUpdateHomework={loadingUpdateHomework}
      loadingSendHomeWorkToCheck={loadingSendHomeWorkToCheck}
      createHomeWorkToCheck={createHomeWorkToCheck}
      sendHomeWorkToCheck={sendHomeWorkToCheck}
      updateHomework={updateHomework}
    />
  );
};

export default SendHomeworkContainer;
