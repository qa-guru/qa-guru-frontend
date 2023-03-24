import React from "react";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate, useParams } from "react-router-dom";
import { primary } from "../../theme/colors";

const style = {
  button: { mb: "25px", color: primary.main },
  icon: { mr: "10px" },
};

const ButtonLessonsList: React.FC = () => {
  const { trainingId } = useParams();
  const navigate = useNavigate();

  return (
    <Button
      variant="outlined"
      sx={style.button}
      onClick={() => navigate(`/training/${trainingId}`)}
    >
      <ArrowBackIcon sx={style.icon} />
      <Typography textTransform="none" variant="subtitle1">
        К списку уроков
      </Typography>
    </Button>
  );
};

export default ButtonLessonsList;
