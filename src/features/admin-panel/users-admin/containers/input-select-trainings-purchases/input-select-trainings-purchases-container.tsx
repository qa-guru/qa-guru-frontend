import { FC } from "react";
import {
  Maybe,
  Order,
  TrainingSortField,
  UserDto,
  useTrainingPurchasesByUserIdQuery,
  useTrainingsQuery,
  useUpdateUserTrainingPurchaseMutation,
} from "api/graphql/generated/graphql";
import NoDataErrorMessage from "shared/components/no-data-error-message";
import { CircularProgress } from "@mui/material";

import InputSelectTrainingsPurchases from "../../views/input-select-trainings-purchases";

interface ITrainingsContainer {
  id?: Maybe<string>;
  user: Maybe<UserDto>;
}

const InputSelectTrainingsPurchasesContainer: FC<ITrainingsContainer> = ({
  user,
}) => {
  const { data: dataTrainings, loading: loadingTrainings } = useTrainingsQuery({
    variables: {
      offset: 0,
      limit: 100,
      sort: { field: TrainingSortField.CreationDate, order: Order.Desc },
    },
  });

  const {
    data: dataTrainingPurchasesByUserId,
    loading: loadingTrainingsPurchases,
  } = useTrainingPurchasesByUserIdQuery({
    variables: { userId: user?.id! },
  });

  const [
    updateUserTrainingPurchase,
    { loading: loadingUpdateUserTrainingPurchase },
  ] = useUpdateUserTrainingPurchaseMutation();

  if (loadingTrainingsPurchases || loadingTrainings)
    return <CircularProgress size={20} />;
  if (!dataTrainings || !dataTrainingPurchasesByUserId)
    return <NoDataErrorMessage />;

  return (
    <InputSelectTrainingsPurchases
      dataTrainings={dataTrainings}
      dataTrainingPurchasesByUserId={dataTrainingPurchasesByUserId}
      loadingUpdateUserTrainingPurchase={loadingUpdateUserTrainingPurchase}
      updateUserTrainingPurchase={updateUserTrainingPurchase}
      user={user}
    />
  );
};

export default InputSelectTrainingsPurchasesContainer;
