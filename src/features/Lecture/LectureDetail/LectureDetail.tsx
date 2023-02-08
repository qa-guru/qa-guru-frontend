import React from "react";
import { Stack } from "@mui/material";
import LectureTitle from "../ui/LectureTitle";
import LectureDescription from "../ui/LectureDescription";
import LectureSpeakers from "../ui/LectureSpeakers";
import LectureContent from "../ui/LectureContent";
import LectureHomework from "../ui/LectureHomework";
import { ILectureDetail } from "./LectureDetail.types";
import SendHomeWorkToCheck from "../ui/SendHomeWorkToCheck";
import { SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const style = {
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

export interface ISendHomeWorkContent {
  content: string;
}

const LectureDetail: React.FC<ILectureDetail> = (props) => {
  const {
    dataLecture,
    dataLectureHomeWork,
    loadingSendHomeWorkToCheck,
    sendHomeWorkToCheck,
  } = props;
  const { lecture } = dataLecture;
  const { lectureHomeWork } = dataLectureHomeWork;
  const { lessonId } = useParams();

  const { handleSubmit, control } = useForm<ISendHomeWorkContent>({
    defaultValues: {
      content: "",
    },
  });

  const sendHomeWork: SubmitHandler<ISendHomeWorkContent> = (data) => {
    sendHomeWorkToCheck({
      variables: { lectureId: lessonId!, content: data.content },
    });
  };

  return (
    <Stack sx={style.stack}>
      <LectureTitle title={lecture?.subject!} />
      <LectureDescription mockDescription={mockDescription!} />
      <LectureSpeakers speakers={lecture?.speakers!} />
      <LectureContent contentLecture={mockContentLecture} />
      <LectureHomework contentLectureHomeWork={mockLectureHomeWork} />
      <SendHomeWorkToCheck
        handleSubmit={handleSubmit}
        control={control}
        sendHomeWork={sendHomeWork}
        loadingSendHomeWorkToCheck={loadingSendHomeWorkToCheck}
      />
    </Stack>
  );
};

export default LectureDetail;
