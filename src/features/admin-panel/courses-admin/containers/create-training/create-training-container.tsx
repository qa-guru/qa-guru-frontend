import { FC } from "react";

import {
  Maybe,
  Order,
  TrainingSortField,
  TrainingsDocument,
  TrainingsQuery,
  useUpdateTrainingMutation,
} from "api/graphql/generated/graphql";

import CreateTrainingButton from "../../views/create-training-button";

const CreateTrainingContainer: FC = () => {
  const [updateTraining, { loading }] = useUpdateTrainingMutation({
    update: (cache, { data }) => {
      const createTraining = data?.updateTraining;

      const existingTrainings: Maybe<TrainingsQuery> = cache.readQuery({
        query: TrainingsDocument,
        variables: {
          offset: 0,
          limit: 10,
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
          limit: 10,
          sort: { field: TrainingSortField.CreationDate, order: Order.Desc },
        },
        data: updatedTrainings,
      });
    },
  });

  return (
    <CreateTrainingButton updateTraining={updateTraining} loading={loading} />
  );
};

export default CreateTrainingContainer;
