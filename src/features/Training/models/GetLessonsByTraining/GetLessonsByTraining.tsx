import React from "react";
import { useTrainingByIdQuery } from "../../../../api/graphql/training/trainingById";
import Spinner from "../../../../shared/ui/Spinner/Spinner";
import { useReactiveVar } from "@apollo/client";
import { trainingIdVar } from "../../../../cache";
import { Typography } from "@mui/material";

const GetLessonsByTraining: React.FC = () => {
  const idTraining = useReactiveVar(trainingIdVar);

  const { data, loading } = useTrainingByIdQuery({
    variables: { id: idTraining },
    skip: !idTraining,
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <ol>
      {data?.training?.lectures?.map((item, index) => {
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
