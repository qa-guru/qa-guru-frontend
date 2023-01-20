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

      <Typography variant="h2">Спикеры</Typography>
      <Box
        sx={{
          borderRadius: "16px",
          border: 1,
          width: "min-content",
          padding: "10px",
        }}
      >
        <Avatar
          sx={{ width: 70, height: 70 }}
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        <Typography>Alexander Taldykin</Typography>
      </Box>

      <Typography
        variant="subtitle2"
        dangerouslySetInnerHTML={{ __html: contentLecture }}
      />

      <Typography variant="h6">Домашнее задание</Typography>
      <Box pt="15px" pb="15px">
        <Typography
          variant="subtitle1"
          dangerouslySetInnerHTML={{ __html: contentLectureHomeWork }}
        />
      </Box>
      <Typography variant="h6">Ваш ответ</Typography>
      <TextField
        multiline
        rows={5}
        placeholder="поле для ответа"
        variant="filled"
      />
      <Box textAlign="center">
        <LoadingButton sx={{ minWidth: "143px" }} variant="contained">
          Отправить
        </LoadingButton>
      </Box>
    </Stack>
  );
};

export default LectureDetail;
