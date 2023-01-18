import React from "react";
import { Container, Divider, Stack } from "@mui/material";
import LectureHomework from "../../features/Lecture/models/LectureHomework";
import LectureDetail from "../../features/Lecture/models/LectureDetail";

const Lecture: React.FC = () => {
  return (
    <Container maxWidth={"xl"}>
      <Stack spacing={2}>
        <LectureDetail />
        <Divider />
        <LectureHomework />
      </Stack>
    </Container>
  );
};

export default Lecture;
