import React from "react";
import TrainingLectures from "../../features/TrainingLecture/models/TrainingLectures";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const LecturesByTraining: React.FC = () => {
  let navigate = useNavigate();

  return (
    <>
      <Typography variant="h4" component="h4">
        Список уроков
      </Typography>
      <TrainingLectures />
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

export default LecturesByTraining;
