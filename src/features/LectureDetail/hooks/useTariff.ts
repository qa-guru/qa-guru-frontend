import { useMemo } from "react";
import { useTrainingPurchasesQuery } from "../../../api/graphql/trainingPurchase/trainingPurchases";

interface ITariffHook {
  trainingId?: string;
}

const useTariff = ({ trainingId }: ITariffHook) => {
  const { data } = useTrainingPurchasesQuery();

  const tariffHomework = useMemo(() => {
    return (
      data?.trainingPurchases?.some(
        (item) =>
          item?.trainingTariff.training?.id === trainingId &&
          item?.trainingTariff.homeWork
      ) ?? false
    );
  }, [data, trainingId]);

  return { tariffHomework };
};

export default useTariff;
