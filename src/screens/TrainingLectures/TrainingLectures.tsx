import React from "react";
import GetTrainingLectures from "../../features/TrainingLecture/models/GetTrainingLectures/GetTrainingLectures";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TrainingLectures: React.FC = () => {
  let navigate = useNavigate();

  return (
    <>
      <Typography variant="h4" component="h4">
        Список уроков
      </Typography>
      <GetTrainingLectures />
      <Box textAlign="center" mt="25px">
        <Button
          sx={{ minWidth: "143px" }}
          onClick={() => navigate("/")}
          variant="contained"
        >
          Back
        </Button>
      </Box>
    </>
  );
};

export default TrainingLectures;
