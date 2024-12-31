import { FC } from "react";
import { useParams } from "react-router-dom";

import {
  HomeWorkByLectureAndTrainingDocument,
  HomeWorkByLectureAndTrainingQuery,
  Maybe,
  useCreateHomeWorkToCheckMutation,
} from "api/graphql/generated/graphql";

import SendHomework from "../view";

const SendHomeworkContainer: FC<{ homeWorkId?: Maybe<string> }> = ({
  homeWorkId,
}) => {
  const { lectureId, trainingId } = useParams();

  const [createHomeWorkToCheck, { loading }] = useCreateHomeWorkToCheckMutation(
    {
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
            answer: newCreateHomeWorkToCheck?.answer,
          },
        };

        cache.writeQuery({
          query: HomeWorkByLectureAndTrainingDocument,
          variables: { lectureId: lectureId!, trainingId: trainingId! },
          data: updatedHomeWorkByLectureAndTraining,
        });
      },
    }
  );

  return (
    <SendHomework
      loading={loading}
      createHomeWorkToCheck={createHomeWorkToCheck}
      homeWorkId={homeWorkId}
    />
  );
};

export default SendHomeworkContainer;
