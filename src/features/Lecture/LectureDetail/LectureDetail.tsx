import React from "react";
import { Box, Stack, TextField, Typography } from "@mui/material";
import DOMPurify from "isomorphic-dompurify";
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
    <Stack sx={style.stack}>
      <LectureTitle title={lecture?.subject!} />
      <LectureDescription arrayDescription={arrayDescription!} />
      <LectureSpeakers speakers={lecture?.speakers!} />
      <LectureContent contentLecture={contentLecture} />
      <LectureHomework contentLectureHomeWork={contentLectureHomeWork} />

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
