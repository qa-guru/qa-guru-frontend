import React from "react";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { style } from "../styles";

const ButtonTrainingList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      sx={style.trainigButton}
      onClick={() => navigate("/")}
    >
      <ArrowBackIcon sx={style.trainingIcon} />
      <Typography textTransform="none" variant="subtitle1">
        К списку курсов
      </Typography>
    </Button>
  );
};

export default ButtonTrainingList;
