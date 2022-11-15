import React from "react";
import GetLessonsByTraining from "../../features/Training/models/GetLessonsByTraining/GetLessonsByTraining";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTrainingByIdQuery } from "../../api/graphql/training/trainingById";
import Spinner from "../../shared/ui/Spinner/Spinner";
import { useReactiveVar } from "@apollo/client";
import { trainingIdVar } from "../../cache";

const LessonsByTraining: React.FC = () => {
  let navigate = useNavigate();

  const idTraining = useReactiveVar(trainingIdVar);

  const { data, loading } = useTrainingByIdQuery({
    variables: { id: idTraining },
    skip: !idTraining,
  });

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Typography textAlign="center" variant="h3" component="h3">
        {data?.training?.name}
      </Typography>
      <Typography variant="h4" component="h4">
        Список уроков:
      </Typography>
      <GetLessonsByTraining />
      <Button onClick={() => navigate("/")} variant="contained">
        Back
      </Button>
    </>
  );
};

export default LessonsByTraining;
