import React from "react";
import { useTrainingPurchasesByUserIdQuery } from "../../../../api/graphql/training/trainingPurchasesByUserId";
import { IGetTrainingByUserId } from "./GetTrainingByUserId.types";
import Spinner from "../../../../shared/ui/Spinner/Spinner";

const GetTrainingByUserId: React.FC<IGetTrainingByUserId> = ({ idUser }) => {
  const { data, loading } = useTrainingPurchasesByUserIdQuery({
    variables: { id: idUser },
    skip: !idUser,
  });

  console.log(idUser);

  if (loading) {
    return <Spinner />;
  }

  return (
    <ul>
      {data?.trainingPurchasesByUserId?.map((item) => {
        return <li>{item?.training.name}</li>;
      })}
    </ul>
  );
};

export default GetTrainingByUserId;
