import React from "react";
import GetLessonsByTraining from "../../features/Training/models/GetLessonsByTraining/GetLessonsByTraining";
import { Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useTrainingQuery } from "../../api/graphql/training/training";
import Spinner from "../../shared/ui/Spinner/Spinner";

const LessonsByTraining: React.FC = () => {
  let navigate = useNavigate();
  let { trainingId } = useParams();

  const { data, loading } = useTrainingQuery({
    variables: { id: trainingId! },
    skip: !trainingId,
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
