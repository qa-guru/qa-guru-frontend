import React from "react";
import { Box, Button } from "@mui/material";
import BlurredComponent from "./BlurredComponent";
import LectureHomework from "../features/LectureDetail/LectureHomework";
import Homework from "../features/LectureDetail/Homework";
import {
  HomeWorkByLectureQuery,
  LectureHomeWorkQuery,
} from "../api/graphql/generated/graphql";
import { primary } from "../theme/colors";

const mockDataLectureHomework: LectureHomeWorkQuery = {
  lectureHomeWork: [
    {
      type: "text",
      value:
        "Здесь будет отображаться текст домашнего задания к текущей лекции.\n" +
        "Пример домашнего задания:\n" +
        '1. Есть ли разница между $("h1 div"); и $("h1").$("div").\n' +
        "Может ли привести к тому что, поиск найдёт разные элементы?\n" +
        "2. Разработайте следующий автотест:\n" +
        " - Откройте страницу Selenide в Github\n" +
        " - Перейдите в раздел Wiki проекта\n" +
        " - Убедитесь, что в списке страниц (Pages) есть страница SoftAssertions\n" +
        " - Откройте страницу SoftAssertions, проверьте что внутри есть пример кода для JUnit5",
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
    cursor: "default",
    borderRadius: "7px",
    "&:hover": { backgroundColor: primary.main },
  },
};

const BlurredHomework: React.FC = () => {
  return (
    <Box position="relative">
      <BlurredComponent>
        <LectureHomework dataLectureHomework={mockDataLectureHomework} />
        <Homework dataHomeWorkByLecture={mockDataHomeWorkByLecture} />
      </BlurredComponent>
      <Button
        disableElevation
        disableTouchRipple
        size="large"
        sx={style.button}
        variant="contained"
      >
        Д/З недоступно
      </Button>
    </Box>
  );
};

export default BlurredHomework;
