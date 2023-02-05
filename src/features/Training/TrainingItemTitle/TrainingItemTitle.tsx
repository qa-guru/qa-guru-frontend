import React from "react";
import { Typography } from "@mui/material";
import { ITrainingItemTitle } from "./TrainingItemTitle.types";

const TrainingItemTitle: React.FC<ITrainingItemTitle> = ({ data }) => {
  const { training } = data;

  return (
    <Typography mb="20px" variant="h4">
      {training?.name}
    </Typography>
  );
};

export default TrainingItemTitle;
