import React, { useState } from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { format, parseISO } from "date-fns";
import { IHomework } from "./Homework.types";
import UpdateHomework from "./UpdateHomework";
import SendHomeWork from "./SendHomework";
import Comment from "./Comment";
import { ReactComponent as OvenClock } from "../../../assets/icons/ovenclock.svg";
import { ReactComponent as Search } from "../../../assets/icons/search.svg";
import { ReactComponent as Done } from "../../../assets/icons/done.svg";
import TextSerialization from "../../../shared/TextSerialization";

const style = {
  paper: { padding: { xs: "15px", md: "20px" }, mt: "40px" },
  buttonUpdate: { textTransform: "none", minWidth: "147px", mt: "15px" },
  avatar: {
    width: 40,
    height: 40,
  },
  wrapper: {
    width: "max-content",
    mt: "20px",
  },
};

const Homework: React.FC<IHomework> = ({ dataHomeWorkByLecture }) => {
  const {
    status,
    startCheckingDate,
    endCheckingDate,
    mentor,
    student,
    creationDate,
    answer,
    id,
  } = dataHomeWorkByLecture.homeWorkByLecture!;

  console.log(id);

  const [openHomeWorkEdit, setOpenHomeWorkEdit] = useState<boolean>(false);

  let icon;
  let date;
  let statusText;
  let homework;

  switch (status) {
    case "NEW":
      icon = <OvenClock />;
      date = null;
      statusText = "Ожидает проверки";
      break;
    case "IN_REVIEW":
      icon = <Search />;
      date = format(parseISO(startCheckingDate), "dd.MM.yyyy");
      statusText = "На проверке";
      break;
    case "APPROVED":
      icon = <Done />;
      date = format(parseISO(endCheckingDate), "dd.MM.yyyy");
      statusText = "Принято";
      break;
  }

  if (status && !openHomeWorkEdit) {
    homework = <TextSerialization text={answer!} />;
  } else if (status && openHomeWorkEdit) {
    homework = (
      <UpdateHomework
        answer={answer}
        setOpenHomeWorkEdit={setOpenHomeWorkEdit}
        id={id}
      />
    );
  } else {
    homework = <SendHomeWork />;
  }

  return (
    <Paper sx={style.paper}>
      <Stack spacing={3} direction="row" alignItems="center">
        <Typography variant="h5">Ответ на задание</Typography>
        <Stack direction="row" spacing={1.5} alignItems="center">
          {icon}
          <Box>
            <Typography variant="subtitle1">{statusText}</Typography>
            <Typography variant="subtitle2">{date}</Typography>
          </Box>
          {status === ("IN_REVIEW" || "APPROVED") && (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Avatar
                sx={style.avatar}
                alt="Remy Sharp"
                src="/static/images/avatar/1.jpg"
              />
              <Typography variant="subtitle1">
                {mentor?.firstName} {mentor?.lastName}
              </Typography>
            </Stack>
          )}
        </Stack>
      </Stack>

      {status && (
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
              {student?.firstName} {student?.lastName}
            </Typography>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle2">
                {format(parseISO(creationDate!), "dd.MM.yyyy '|' HH:mm")}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      )}

      <Box mt="7px">{homework}</Box>
      {!openHomeWorkEdit && status && (
        <Button
          onClick={() => setOpenHomeWorkEdit(true)}
          sx={style.buttonUpdate}
          variant="contained"
        >
          Редактировать
        </Button>
      )}

      {status && <Comment id={id!} />}
    </Paper>
  );
};

export default Homework;
