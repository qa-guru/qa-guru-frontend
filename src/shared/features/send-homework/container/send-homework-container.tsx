import { FC } from "react";
import {
  HomeWorkByLectureAndTrainingDocument,
  HomeWorkByLectureAndTrainingQuery,
  Maybe,
  useSendHomeWorkToCheckMutation,
} from "api/graphql/generated/graphql";
import { useParams } from "react-router-dom";

import SendHomework from "../view";

const SendHomeworkContainer: FC = () => {
  const { lectureId, trainingId } = useParams();

  const [sendHomeWorkToCheck, { loading }] = useSendHomeWorkToCheckMutation({
    update: (cache, { data }) => {
      const newSendHomeWorkToCheck = data?.sendHomeWorkToCheck;

      const existingHomeWorkByLectureAndTraining: Maybe<HomeWorkByLectureAndTrainingQuery> =
        cache.readQuery({
          query: HomeWorkByLectureAndTrainingDocument,
          variables: { lectureId: lectureId!, trainingId: trainingId! },
        });

      const updatedHomeWorkByLectureAndTraining = {
        homeWorkByLectureAndTraining: {
          ...existingHomeWorkByLectureAndTraining?.homeWorkByLectureAndTraining,
          answer: newSendHomeWorkToCheck?.answer,
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
    <SendHomework loading={loading} sendHomeWorkToCheck={sendHomeWorkToCheck} />
  );
};

export default SendHomeworkContainer;
