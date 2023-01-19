import React from "react";
import { Box, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { LectureHomeWorkQuery } from "../../../../generated/graphql";
import DOMPurify from "isomorphic-dompurify";

interface ILectureHomework {
  data: LectureHomeWorkQuery;
}

const LectureHomework: React.FC<ILectureHomework> = ({ data }) => {
  const { lectureHomeWork } = data;

  const content = DOMPurify.sanitize(lectureHomeWork!);

  return (
    <>
      <Typography variant="h6">Домашнее задание</Typography>
      <Box pt="15px" pb="15px">
        <Typography
          variant="subtitle1"
          dangerouslySetInnerHTML={{ __html: content }}
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
    </>
  );
};

export default LectureHomework;
