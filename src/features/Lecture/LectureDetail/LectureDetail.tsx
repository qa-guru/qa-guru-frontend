import React from "react";
import { LectureHomeWorkQuery, LectureQuery } from "../../../generated/graphql";
import { Box, Paper, Stack, TextField, Typography } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
import { LoadingButton } from "@mui/lab";
import LectureTitle from "../ui/LectureTitle";
import LectureDescription from "../ui/LectureDescription";
import LectureSpeakers from "../ui/LectureSpeakers";
import LectureContent from "../ui/LectureContent";
import LectureHomework from "../ui/LectureHomework";

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

  const contentLecture = DOMPurify.sanitize(lecture?.content!, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });
  const contentLectureHomeWork = DOMPurify.sanitize(lectureHomeWork!, {
    ADD_TAGS: ["iframe"],
    ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
  });

  const arrayDescription = lecture?.description?.split("\n");

  return (
    <Stack spacing={2}>
      <LectureTitle title={lecture?.subject!} />
      <LectureDescription arrayDescription={arrayDescription!} />
      <LectureSpeakers speakers={lecture?.speakers!} />
      <LectureContent contentLecture={contentLecture} />
      <LectureHomework contentLectureHomeWork={contentLectureHomeWork} />

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
