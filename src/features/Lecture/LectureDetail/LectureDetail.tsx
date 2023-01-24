import React from "react";
import { LectureHomeWorkQuery, LectureQuery } from "../../../generated/graphql";
import {
  Avatar,
  Box,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import { LoadingButton } from "@mui/lab";

interface ILectureDetail {
  dataLecture: LectureQuery;
  dataLectureHomeWork: LectureHomeWorkQuery;
}

const LectureDetail: React.FC<ILectureDetail> = ({
  dataLecture,
  dataLectureHomeWork,
}) => {
  const { lecture } = dataLecture;
  const { lectureHomeWork } = dataLectureHomeWork;

  const contentLecture = DOMPurify.sanitize(lecture?.content!);
  const contentLectureHomeWork = DOMPurify.sanitize(lectureHomeWork!);

  return (
    <Stack spacing={2}>
      <Typography variant="h2">{lecture?.subject}</Typography>
      <Paper sx={{ padding: "20px" }}>
        <Typography mb="14px" variant="h4">
          Содержание урока
        </Typography>
        <Divider />
        <Typography mt="20px" variant="subtitle2">
          {lecture?.description}
        </Typography>
      </Paper>

      <Typography pt="40px" variant="h2">
        Спикеры
      </Typography>
      <Stack
        spacing={2}
        direction="row"
        alignItems="center"
        sx={{
          borderRadius: "16px",
          border: 1,
          borderColor: "#CAC4D0",
          width: "min-content",
          padding: "10px 30px 10px 10px",
        }}
      >
        <Avatar
          sx={{ width: 70, height: 70 }}
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        <Box width="max-content" ml="16px">
          <Typography variant="h4">Alexander Taldykin</Typography>
          <Typography mt="4px" variant="subtitle2">
            Student
          </Typography>
        </Box>
      </Stack>

      <Typography pt="40px" variant="h2">
        Материалы урока
      </Typography>
      <Paper sx={{ padding: "20px" }}>
        <Typography
          variant="subtitle2"
          dangerouslySetInnerHTML={{ __html: contentLecture }}
        />
      </Paper>

      <Typography pt="40px" variant="h2">
        Домашнее задание
      </Typography>
      <Paper sx={{ padding: "20px" }}>
        <Typography
          variant="subtitle1"
          dangerouslySetInnerHTML={{ __html: contentLectureHomeWork }}
        />
      </Paper>

      <Typography pt="40px" variant="h2">
        Ход выполнения
      </Typography>
      <TextField
        multiline
        rows={5}
        placeholder="поле для ответа"
        variant="filled"
      />
      <Box>
        <LoadingButton sx={{ minWidth: "143px" }} variant="contained">
          Отправить
        </LoadingButton>
      </Box>
    </Stack>
  );
};

export default LectureDetail;
