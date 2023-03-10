import { useMemo, useState } from "react";
import { useTrainingPurchasesQuery } from "../api/graphql/trainingPurchase/trainingPurchases";

interface ITariffHook {
  trainingId?: string;
}

const useTariff = ({ trainingId }: ITariffHook) => {
  const { data } = useTrainingPurchasesQuery();

  const hasTariffHomework = useMemo(() => {
    return (
      data?.trainingPurchases?.some(
        (p) =>
          p?.trainingTariff.training?.id === trainingId &&
          p?.trainingTariff.homeWork
      ) ?? false
    );
  }, [data, trainingId]);

  return { hasTariffHomework };
};

export default useTariff;
