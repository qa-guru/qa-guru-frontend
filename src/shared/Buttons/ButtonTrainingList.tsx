import React from "react";
import { Button, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { primary } from "../../theme/colors";

const style = {
  button: {
    mb: "25px",
    color: primary.main,
  },
  icon: { mr: "10px" },
};

const ButtonTrainingList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Button variant="outlined" sx={style.button} onClick={() => navigate("/")}>
      <ArrowBackIcon sx={style.icon} />
      <Typography textTransform="none" variant="subtitle1">
        К списку курсов
      </Typography>
    </Button>
  );
};

export default ButtonTrainingList;
