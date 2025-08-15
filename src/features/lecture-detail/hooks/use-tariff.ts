import { useMemo } from "react";

import { useTrainingPurchasesQuery } from "api/graphql/generated/graphql";

interface ITariffHook {
  trainingId?: string;
}

const useTariff = ({ trainingId }: ITariffHook) => {
  const { data } = useTrainingPurchasesQuery();

  const tariffHomework = useMemo(() => {
    if (!trainingId || !data?.trainingPurchases) {
      return false;
    }

    return data.trainingPurchases.some(
      (item) =>
        item?.trainingTariff.training?.id === trainingId &&
        item?.trainingTariff.homeWork
    );
  }, [data, trainingId]);

  return { tariffHomework };
};

export default useTariff;
