import React from "react";
import { IHomeworkAnswer } from "./HomeworkAnswer.types";
import { Box, Paper, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import RenderAnswer from "./RenderAnswer/RenderAnswer";

const style = {
  paper: { padding: "30px" },
  wrapper: {
    width: "max-content",
  },
  avatar: {
    width: 40,
    height: 40,
  },
};

const HomeworkAnswer: React.FC<IHomeworkAnswer> = (props) => {
  const { data } = props;

  return (
    <>
      <Typography pt="40px" variant="h4" mb="15px">
        Ответ на задание
      </Typography>
      <Paper sx={style.paper}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack
            spacing={1.7}
            direction="row"
            alignItems="center"
            sx={style.wrapper}
          >
            <Avatar
              sx={style.avatar}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Typography variant="subtitle2">
              {data?.homeWorkByStudentAndLecture?.student?.firstName}{" "}
              {data?.homeWorkByStudentAndLecture?.student?.lastName}
            </Typography>
            <Typography variant="subtitle2">
              Создано {data?.homeWorkByStudentAndLecture?.creationDate}
            </Typography>
          </Stack>
          <Box>
            <Avatar
              sx={style.avatar}
              alt="Remy Sharp"
              src="/static/images/avatar/1.jpg"
            />
            <Typography variant="subtitle2">
              {data?.homeWorkByStudentAndLecture?.mentor?.firstName}{" "}
              {data?.homeWorkByStudentAndLecture?.mentor?.lastName}
            </Typography>
            <Typography variant="subtitle1">
              {data?.homeWorkByStudentAndLecture?.status}
            </Typography>
            <Typography variant="subtitle2">
              {data?.homeWorkByStudentAndLecture?.startCheckingDate}
            </Typography>
          </Box>
        </Stack>
        <RenderAnswer answer={data?.homeWorkByStudentAndLecture?.answer!} />
      </Paper>
    </>
  );
};

export default HomeworkAnswer;
