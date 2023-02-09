import React from "react";
import { Box } from "@mui/material";
import LectureTitle from "./LectureTitle";
import LectureDescription from "./LectureDescription";
import LectureSpeakers from "./LectureSpeakers";
import LectureContent from "./LectureContent";
import { ILectureDetail } from "./LectureDetail.types";

const mockDescription = [
  "Практика. Пишем первый автотест: Java / Gradle / JUnit5 / Selenide.",
  "Изучаем готовый проект с инфраструктурой: Github / Jenkins / Allure Report / TestOps / Selenoid / Телеграм-бот.",
];

const mockContent = [
  {
    type: "video",
    value: "Запись с занятия",
    url: "hzDWZgPQ8mY",
  },
  {
    type: "video",
    value: "Запись занятия 14-го потока",
    url: "DlEIccu9wE0",
  },
  {
    type: "video",
    value: "Разбор домашнего задания к уроку",
    url: "AWeeoE_US-k",
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

const LectureDetail: React.FC<ILectureDetail> = (props) => {
  const { dataLecture } = props;
  const { lecture } = dataLecture;

  return (
    <Box>
      <LectureTitle title={lecture?.subject!} />
      <LectureDescription description={mockDescription!} />
      <LectureSpeakers speakers={lecture?.speakers!} />
      <LectureContent content={mockContent} />
    </Box>
  );
};

export default LectureDetail;
