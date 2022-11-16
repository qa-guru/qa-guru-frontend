import React from "react";
import { useTrainingPurchasesByUserIdQuery } from "../../../../api/graphql/training/trainingPurchasesByUserId";
import { IGetTrainingByUserId } from "./GetTrainingPurchasesByUserId.types";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import { Link } from "react-router-dom";

const GetTrainingPurchasesByUserId: React.FC<IGetTrainingByUserId> = ({
  idUser,
}) => {
  const { data, loading } = useTrainingPurchasesByUserIdQuery({
    variables: { id: idUser },
    skip: !idUser,
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <ul>
      {data?.trainingPurchasesByUserId?.map((item, index) => {
        return (
          <li key={index}>
            <Link to={`/training/${item?.training.id}`}>
              {item?.training.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default GetTrainingPurchasesByUserId;
