import { FC } from "react";
import { useParams } from "react-router-dom";

import {
  useCreateHomeWorkToCheckMutation,
  useUpdateHomeworkMutation,
  useSendHomeWorkToCheckMutation,
  HomeWorkByLectureAndTrainingDocument,
  Maybe,
  HomeWorkByLectureAndTrainingQuery,
} from "api/graphql/generated/graphql";

import SendHomework from "../view";

interface SendHomeworkContainerProps {
  testGroup?: any;
  trainingId?: string;
  lectureId?: string;
}

const SendHomeworkContainer: FC<SendHomeworkContainerProps> = ({
  testGroup,
  trainingId,
  lectureId,
}) => {
  const params = useParams();
  const currentLectureId = lectureId || params.lectureId;
  const currentTrainingId = trainingId || params.trainingId;

  const [createHomeWorkToCheck, { loading: loadingCreateHomeWorkToCheck }] =
    useCreateHomeWorkToCheckMutation({
      update: (cache, { data }) => {
        const newCreateHomeWorkToCheck = data?.createHomeWorkToCheck;

        const existingHomeWorkByLectureAndTraining: Maybe<HomeWorkByLectureAndTrainingQuery> =
          cache.readQuery({
            query: HomeWorkByLectureAndTrainingDocument,
            variables: {
              lectureId: currentLectureId!,
              trainingId: currentTrainingId!,
            },
          });

        const updatedHomeWorkByLectureAndTraining = {
          homeWorkByLectureAndTraining: {
            ...existingHomeWorkByLectureAndTraining?.homeWorkByLectureAndTraining,
            ...newCreateHomeWorkToCheck,
          },
        };

        cache.writeQuery({
          query: HomeWorkByLectureAndTrainingDocument,
          variables: {
            lectureId: currentLectureId!,
            trainingId: currentTrainingId!,
          },
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
            variables: {
              lectureId: currentLectureId!,
              trainingId: currentTrainingId!,
            },
          });

        const updatedHomeWorkByLectureAndTraining = {
          homeWorkByLectureAndTraining: {
            ...existingHomeWorkByLectureAndTraining?.homeWorkByLectureAndTraining,
            ...newUpdateHomework,
          },
        };

        cache.writeQuery({
          query: HomeWorkByLectureAndTrainingDocument,
          variables: {
            lectureId: currentLectureId!,
            trainingId: currentTrainingId!,
          },
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
      testGroup={testGroup}
      trainingId={currentTrainingId}
      lectureId={currentLectureId}
    />
  );
};

export default SendHomeworkContainer;
