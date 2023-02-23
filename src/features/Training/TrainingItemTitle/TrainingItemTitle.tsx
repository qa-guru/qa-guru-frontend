import React from "react";
import { Typography } from "@mui/material";
import { ITrainingItemTitle } from "./TrainingItemTitle.types";

const TrainingItemTitle: React.FC<ITrainingItemTitle> = ({ data }) => {
  const { name } = data.training!;

  return (
    <Typography mb="20px" variant="h4">
      {name}
    </Typography>
  );
};

export default TrainingItemTitle;
