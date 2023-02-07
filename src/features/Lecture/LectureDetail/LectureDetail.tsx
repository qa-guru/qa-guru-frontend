import React from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import LectureTitle from "../ui/LectureTitle";
import LectureDescription from "../ui/LectureDescription";
import LectureSpeakers from "../ui/LectureSpeakers";
import LectureContent from "../ui/LectureContent";
import LectureHomework from "../ui/LectureHomework";
import { ILectureDetail } from "./LectureDetail.types";

const style = {
  loadingButton: { minWidth: "143px", marginTop: "15px" },
  stack: { spacing: 2 },
};

const mockDescription = [
  "Практика. Пишем первый автотест: Java / Gradle / JUnit5 / Selenide.",
  "Изучаем готовый проект с инфраструктурой: Github / Jenkins / Allure Report / TestOps / Selenoid / Телеграм-бот.",
];

const mockContentLecture = [
  {
    type: "video",
    value: "Запись с занятия",
    url: "https://www.youtube.com/watch?v=hzDWZgPQ8mY",
  },
  {
    type: "video",
    value: "Запись занятия 14-го потока",
    url: "https://www.youtube.com/watch?v=DlEIccu9wE0",
  },
  {
    type: "video",
    value: "Разбор домашнего задания к уроку",
    url: "https://www.youtube.com/watch?v=AWeeoE_US-k",
  },
  {
    type: "title",
    value: "Полезные ссылки:",
  },
  {
    type: "link",
    value: "Ссылка на репозиторий",
    url: "https://github.com/qa-guru/demoqa-tests-16/tree/homework",
  },
  {
    type: "link",
    value: "Статья по настройке рабочей среды",
    url: "https://github.com/qa-guru/getting-started-java/wiki",
  },
  {
    type: "title",
    value: "Selenide:",
  },
  {
    type: "link",
    value: "Документация",
    url: "https://selenide.org/documentation.html",
  },
  {
    type: "link",
    value: "Сравнение Selenide с Selenium",
    url: "https://github.com/selenide/selenide/wiki/Selenide-vs-Selenium",
  },
  {
    type: "link",
    value: "Еще одна статья про Selenide",
    url: "https://ru.selenide.org/2016/10/20/selenide-vs-pure-selenium/",
  },
  {
    type: "title",
    value: "Git:",
  },
  {
    type: "link",
    value: "Интерактивный туториал",
    url: "https://learngitbranching.js.org",
  },
  {
    type: "link",
    value: "Лучшая книга про git",
    url: "https://git-scm.com/book/ru/v2/",
  },
  {
    type: "link",
    value: "Курс: введение в git",
    url: "https://ru.hexlet.io/courses/intro_to_git",
  },
  {
    type: "link",
    value: "Курс: основы git",
    url: "https://stepik.org/course/3145/promo",
  },
];

const mockLectureHomeWork = [
  {
    type: "text",
    value: "1. Зарегистрируйте аккаунт github.",
  },
  {
    type: "text",
    value: "2. Создайте новый репозиторий для домашнего задания.",
  },
  {
    type: "text",
    value: "3. Разработайте один автотест на проверку тестовой формы.",
  },
  {
    type: "link",
    value: "Тестовая форма demoqa.com",
    url: "https://demoqa.com/automation-practice-form",
  },
  {
    type: "text",
    value: "В поле ответа необходимо приложить ссылку на репозиторий.",
  },
];

const LectureDetail: React.FC<ILectureDetail> = ({
  dataLecture,
  dataLectureHomeWork,
}) => {
  const { lecture } = dataLecture;
  const { lectureHomeWork } = dataLectureHomeWork;

  return (
    <Stack sx={style.stack}>
      <LectureTitle title={lecture?.subject!} />
      <LectureDescription mockDescription={mockDescription!} />
      <LectureSpeakers speakers={lecture?.speakers!} />
      <LectureContent contentLecture={mockContentLecture} />
      <LectureHomework contentLectureHomeWork={mockLectureHomeWork} />

      <Typography pt="40px" variant="h4" mb="15px">
        Ход выполнения
      </Typography>
      <TextField
        multiline
        rows={5}
        placeholder="поле для ответа"
        variant="filled"
      />
      <Box>
        <LoadingButton sx={style.loadingButton} variant="contained">
          Отправить
        </LoadingButton>
      </Box>
    </Stack>
  );
};

export default LectureDetail;
