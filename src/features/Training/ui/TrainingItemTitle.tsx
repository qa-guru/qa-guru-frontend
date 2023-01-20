import React from "react";
import { Typography } from "@mui/material";
import { TrainingQuery } from "../../../generated/graphql";

interface ITrainingItemTitle {
  data: TrainingQuery;
}

const TrainingItemTitle: React.FC<ITrainingItemTitle> = ({ data }) => {
  const { training } = data;

  return (
    <Typography mb="20px" variant="h2">
      {training?.name}
    </Typography>
  );
};

export default TrainingItemTitle;
