import React from "react";
import { IHomeworkAnswer } from "./HomeworkAnswer.types";
import { Box, Paper, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import RenderAnswer from "./RenderAnswer/RenderAnswer";
import { ReactComponent as OvenClock } from "../../../icons/ovenclock.svg";
import { ReactComponent as Search } from "../../../icons/search.svg";
import { ReactComponent as Done } from "../../../icons/done.svg";

const style = {
  paper: { padding: "20px", mt: "40px" },
  wrapper: {
    width: "max-content",
    mt: "20px",
  },
  avatar: {
    width: 40,
    height: 40,
  },
};

const HomeworkAnswer: React.FC<IHomeworkAnswer> = (props) => {
  const { data } = props;

  let icon;
  let date;

  switch (data?.homeWorkByStudentAndLecture?.status) {
    case "NEW":
      icon = <OvenClock />;
      date = null;
      break;
    case "IN_REVIEW":
      icon = <Search />;
      date = data?.homeWorkByStudentAndLecture?.startCheckingDate;
      break;
    case "APPROVED":
      icon = <Done />;
      date = data?.homeWorkByStudentAndLecture?.endCheckingDate;
  }

  return (
    <>
      <Paper sx={style.paper}>
        <Stack spacing={2} direction="row" alignItems="center">
          <Typography variant="h5">Ответ на задание</Typography>
          {icon}
          <Box>
            <Typography variant="subtitle1">
              {data?.homeWorkByStudentAndLecture?.status}
            </Typography>
            <Typography variant="subtitle2">{date}</Typography>
          </Box>
        </Stack>

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
          <Box>
            <Typography variant="subtitle1">
              {data?.homeWorkByStudentAndLecture?.student?.firstName}{" "}
              {data?.homeWorkByStudentAndLecture?.student?.lastName}
            </Typography>
            <Typography variant="subtitle2">
              {data?.homeWorkByStudentAndLecture?.creationDate}
            </Typography>
          </Box>
        </Stack>

        <RenderAnswer answer={data?.homeWorkByStudentAndLecture?.answer!} />
      </Paper>
    </>
  );
};

export default HomeworkAnswer;
