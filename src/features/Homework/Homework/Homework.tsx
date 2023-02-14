import React from "react";
import { IHomeworkAnswer } from "./Homework.types";
import { Box, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { ReactComponent as OvenClock } from "../../../icons/ovenclock.svg";
import { ReactComponent as Search } from "../../../icons/search.svg";
import { ReactComponent as Done } from "../../../icons/done.svg";
import { format, parseISO } from "date-fns";
import SerializeAnswer from "./SerializeAnswer";

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

const Homework: React.FC<IHomeworkAnswer> = (props) => {
  const { data } = props;

  let icon;
  let date;
  let status;
  let createDate;
  let createTime;

  if (data?.homeWorkByStudentAndLecture?.creationDate) {
    createDate = format(
      parseISO(data?.homeWorkByStudentAndLecture?.creationDate),
      "dd.MM.yyyy"
    );

    createTime = format(
      parseISO(data?.homeWorkByStudentAndLecture?.creationDate),
      "HH:mm"
    );
  }

  switch (data?.homeWorkByStudentAndLecture?.status) {
    case "NEW":
      icon = <OvenClock />;
      date = null;
      status = "Ожидает проверки";
      break;
    case "IN_REVIEW":
      icon = <Search />;
      date = format(
        parseISO(data?.homeWorkByStudentAndLecture?.startCheckingDate),
        "dd.MM.yyyy"
      );
      status = "На проверке";
      break;
    case "APPROVED":
      icon = <Done />;
      date = format(
        parseISO(data?.homeWorkByStudentAndLecture?.endCheckingDate),
        "dd.MM.yyyy"
      );
      status = "Принято";
  }

  return (
    <>
      <Stack spacing={3} direction="row" alignItems="center">
        <Typography variant="h5">Ответ на задание</Typography>
        <Stack direction="row" spacing={1.3} alignItems="center">
          {icon}
          <Box>
            <Typography variant="subtitle1">{status}</Typography>
            <Typography variant="subtitle2">{date}</Typography>
          </Box>
        </Stack>
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
          <Stack direction="row" spacing={3}>
            <Typography variant="subtitle2">{createDate}</Typography>
            <Typography variant="subtitle2">{createTime}</Typography>
          </Stack>
        </Box>
      </Stack>

      <SerializeAnswer answer={data?.homeWorkByStudentAndLecture?.answer!} />
    </>
  );
};

export default Homework;
