import React from "react";
import { Box, Button, Container, Divider, Stack } from "@mui/material";
import LectureHomework from "../../features/Lecture/models/LectureHomework";
import Lecture from "../../features/Lecture/models/Lecture";
import { useNavigate, useParams } from "react-router-dom";

const LectureDetail: React.FC = () => {
  let navigate = useNavigate();
  const { trainingId } = useParams();

  return (
    <Container maxWidth={"xl"}>
      <Stack spacing={2}>
        <Lecture />
        <Divider />
        <LectureHomework />
        <Box textAlign="center">
          <Button
            sx={{ minWidth: "143px" }}
            onClick={() => navigate(`/training/${trainingId}`)}
            variant="contained"
          >
            Back
          </Button>
        </Box>
      </Stack>
    </Container>
  );
};

export default LectureDetail;
