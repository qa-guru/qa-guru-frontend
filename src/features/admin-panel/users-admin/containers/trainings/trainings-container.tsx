import { FC } from "react";
import {
  Maybe,
  Order,
  TrainingSortField,
  UserDto,
  useTrainingPurchasesByUserIdQuery,
  useTrainingsQuery,
  useUpdateTrainingPurchaseMutation,
} from "api/graphql/generated/graphql";
import { AppSpinner } from "shared/components/spinners";
import NoDataErrorMessage from "shared/components/no-data-error-message";

import InputSelectTrainings from "../../views/input-select-trainings";

interface ITrainingsContainer {
  id?: Maybe<string>;
  user: Maybe<UserDto>;
}

const TrainingsContainer: FC<ITrainingsContainer> = ({ user }) => {
  const { data, loading, error } = useTrainingsQuery({
    variables: {
      offset: 0,
      limit: 100,
      sort: { field: TrainingSortField.CreationDate, order: Order.Desc },
    },
  });

  const { data: trainingPurchases } = useTrainingPurchasesByUserIdQuery({
    variables: { userId: user?.id! },
  });

  const [updateTrainingPurchase, { error: updateError }] =
    useUpdateTrainingPurchaseMutation();

  if (loading) return <AppSpinner />;
  if (error || updateError) return <NoDataErrorMessage />;
  if (!data) return <NoDataErrorMessage />;

  return (
    <InputSelectTrainings
      data={data}
      loading={loading}
      updateTrainingPurchase={updateTrainingPurchase}
      user={user}
      trainingPurchases={trainingPurchases}
    />
  );
};

export default TrainingsContainer;
