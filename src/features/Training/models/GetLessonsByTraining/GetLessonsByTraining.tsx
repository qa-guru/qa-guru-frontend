import React from "react";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import { Typography } from "@mui/material";
import { useTrainingPurchasesByUserIdQuery } from "../../../../api/graphql/training/trainingLectures";
import { useParams } from "react-router-dom";

const GetLessonsByTraining: React.FC = () => {
  let { trainingId } = useParams();

  const { data, loading } = useTrainingPurchasesByUserIdQuery({
    variables: { id: trainingId },
    skip: !trainingId,
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <ol>
      {data?.trainingLectures?.map((item, index) => {
        return (
          <li key={index}>
            <Typography>{item?.lecture?.subject}</Typography>
          </li>
        );
      })}
    </ol>
  );
};

export default GetLessonsByTraining;
