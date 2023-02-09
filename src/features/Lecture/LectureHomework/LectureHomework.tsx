import React from "react";
import { Box, Link, Paper, Stack, Typography } from "@mui/material";
import { ILectureHomework } from "./LectureHomework.types";

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

const style = {
  paper: { padding: "20px" },
  box: { width: { xs: "100%", sm: "480px" } },
};

const LectureHomework: React.FC<ILectureHomework> = ({ data }) => {
  const { lectureHomeWork } = data;

  return (
    <Box>
      <Typography pt="40px" variant="h4" mb="15px">
        Домашнее задание
      </Typography>
      <Paper sx={style.paper}>
        <Stack spacing={0.5}>
          {mockLectureHomeWork.map((item: any, index: any) => {
            const { value, url, type } = item;

            switch (type) {
              case "title":
                return (
                  <Typography key={index} variant="h6">
                    {value}
                  </Typography>
                );
              case "text":
                return (
                  <Typography key={index} variant="subtitle1">
                    {value}
                  </Typography>
                );
              case "video":
                return (
                  <Box key={index}>
                    <Typography variant="h6">{value}</Typography>
                    <Box sx={style.box}>
                      <iframe
                        // @ts-ignore
                        style={style.iframe}
                        src={`https://www.youtube.com/embed/${url}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Embedded youtube"
                      />
                    </Box>
                  </Box>
                );
              case "link":
                return (
                  <Link key={index} underline="hover" href={url}>
                    {value}
                  </Link>
                );
            }
          })}
        </Stack>
      </Paper>
    </Box>
  );
};

export default LectureHomework;
