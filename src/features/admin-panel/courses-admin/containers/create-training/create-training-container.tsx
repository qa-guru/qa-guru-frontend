import {
  Maybe,
  Order,
  TrainingSortField,
  TrainingsDocument,
  TrainingsQuery,
  useUpdateTrainingMutation,
} from "api/graphql/generated/graphql";
import { FC } from "react";

import СreateTrainingButton from "../../views/create-training-button";

const CreateTrainingContainer: FC = () => {
  const [updateTraining, { loading }] = useUpdateTrainingMutation({
    update: (cache, { data }) => {
      const createTraining = data?.updateTraining;

      const existingTrainings: Maybe<TrainingsQuery> = cache.readQuery({
        query: TrainingsDocument,
        variables: {
          offset: 0,
          limit: 30,
          sort: { field: TrainingSortField.CreationDate, order: Order.Desc },
        },
      });

      const updatedTrainings = {
        ...existingTrainings,
        trainings: {
          ...existingTrainings?.trainings,
          items: [
            createTraining,
            ...(existingTrainings?.trainings?.items ?? []),
          ],
        },
      };

      cache.writeQuery({
        query: TrainingsDocument,
        variables: {
          offset: 0,
          limit: 30,
          sort: { field: TrainingSortField.CreationDate, order: Order.Desc },
        },
        data: updatedTrainings,
      });
    },
  });

  return (
    <СreateTrainingButton updateTraining={updateTraining} loading={loading} />
  );
};

export default CreateTrainingContainer;
