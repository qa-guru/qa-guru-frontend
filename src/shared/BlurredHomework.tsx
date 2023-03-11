import React from "react";
import { Box, Button } from "@mui/material";
import BlurredComponent from "./BlurredComponent";
import LectureHomework from "../features/LectureDetail/LectureHomework";
import Homework from "../features/LectureDetail/Homework";
import {
  HomeWorkByLectureQuery,
  LectureHomeWorkQuery,
} from "../api/graphql/generated/graphql";

const mockDataLectureHomework: LectureHomeWorkQuery = {
  lectureHomeWork: [
    {
      type: "text",
      value: "Сделай уроки",
    },
    {
      type: "link",
      value: "stri1234123412341243123412341234ng",
      url: "https://translate.google.com/",
    },
  ],
};

const mockDataHomeWorkByLecture: HomeWorkByLectureQuery = {
  homeWorkByLecture: {
    id: "string",
    answer: "string",
    status: null,
    creationDate: new Date(),
    startCheckingDate: new Date(),
    endCheckingDate: new Date(),
    lecture: {
      id: "string",
      subject: "string",
    },
    student: {
      id: "string",
      firstName: "string",
      middleName: "string",
      lastName: "string",
    },
    mentor: {
      id: "string",
      firstName: "string",
      middleName: "string",
      lastName: "string",
    },
  },
};

const style = {
  button: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
};

const BlurredHomework: React.FC = () => {
  return (
    <Box position="relative">
      <BlurredComponent>
        <LectureHomework dataLectureHomework={mockDataLectureHomework} />
        <Homework dataHomeWorkByLecture={mockDataHomeWorkByLecture} />
      </BlurredComponent>
      <Button size="large" sx={style.button} variant="contained">
        Купить тариф с д/з
      </Button>
    </Box>
  );
};

export default BlurredHomework;
