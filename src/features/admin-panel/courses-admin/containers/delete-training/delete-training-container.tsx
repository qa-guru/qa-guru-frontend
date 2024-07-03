import { FC } from "react";
import {
  Maybe,
  Order,
  TrainingsDocument,
  TrainingSortField,
  TrainingsQuery,
  useDeleteTrainingMutation,
} from "api/graphql/generated/graphql";

import DeleteTraining from "../../views/delete-training";

interface IDeleteTrainingContainer {
  trainingId: Maybe<string>;
}

const DeleteTrainingContainer: FC<IDeleteTrainingContainer> = ({
  trainingId,
}) => {
  const [deleteTraining, { loading: loadingDeleteTraining }] =
    useDeleteTrainingMutation({
      update: (cache) => {
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
            items: existingTrainings?.trainings?.items?.filter(
              (training) => training?.id !== trainingId
            ),
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
    <DeleteTraining
      deleteTraining={deleteTraining}
      loadingDeleteTraining={loadingDeleteTraining}
      trainingId={trainingId}
    />
  );
};

export default DeleteTrainingContainer;
