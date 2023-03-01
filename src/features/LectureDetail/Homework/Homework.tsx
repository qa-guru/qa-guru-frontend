import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { format, parseISO } from "date-fns";
import { IHomework } from "./Homework.types";
import UpdateHomework from "./UpdateHomework";
import SendHomeWork from "./SendHomework";
import Comment from "./Comment";
import SendComment from "./SendComment";
import { ReactComponent as OvenClock } from "../../../assets/icons/ovenclock.svg";
import { ReactComponent as Search } from "../../../assets/icons/search.svg";
import { ReactComponent as Done } from "../../../assets/icons/done.svg";
import { ReactComponent as Plus } from "../../../assets/icons/button-plus.svg";
import TextSerialization from "../../../shared/TextSerialization";
import { primary } from "../../../theme/colors";

const style = {
  paper: { padding: "20px", mt: "40px" },
  buttonUpdate: { textTransform: "none", minWidth: "151px", mt: "15px" },
  avatar: {
    width: 40,
    height: 40,
  },
  wrapper: {
    width: "max-content",
    mt: "20px",
  },
  loadMoreBtn: { color: primary.main, maxWidth: "20%", margin: "0 auto" },
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

  const [openHomeWorkEdit, setOpenHomeWorkEdit] = useState<boolean>(false);
  const [addComment, setAddComment] = useState<boolean>(false);
  const [size, setSize] = useState<number>(2);
  const [totalElements, setTotalElements] = useState<any>();

  const field: any = "CREATION_DATE";
  const order: any = "DESC";

  let icon;
  let date;
  let statusText;
  let homework;
  let comment;

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

  if (addComment) {
    comment = <SendComment setAddComment={setAddComment} id={id!} />;
  } else {
    comment = (
      <Comment
        id={id!}
        size={size}
        field={field}
        order={order}
        setTotalElements={setTotalElements}
      />
    );
  }

  const loadMore = () => {
    setSize(size + 1);
  };

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
                {format(parseISO(creationDate!), "dd.MM.yyyy")}
              </Typography>
              <Typography variant="subtitle2">
                {format(parseISO?.(creationDate!), "HH:mm")}
              </Typography>
            </Stack>
          </Box>
        </Stack>
      )}

      <Box mt="15px">{homework}</Box>

      {!openHomeWorkEdit && status && (
        <Button
          onClick={() => setOpenHomeWorkEdit(true)}
          sx={style.buttonUpdate}
          variant="contained"
        >
          Редактировать
        </Button>
      )}

      {status && (
        <Box mt="20px" p="0 15px">
          <Typography variant="h5">Комментарии</Typography>
          {comment}

          {!addComment && (
            <>
              <IconButton onClick={() => setAddComment(true)}>
                <Plus />
              </IconButton>

              {totalElements > 2 && totalElements > size && (
                <Stack>
                  <Button
                    onClick={loadMore}
                    sx={style.loadMoreBtn}
                    variant="outlined"
                  >
                    Загрузить еще
                  </Button>
                </Stack>
              )}
            </>
          )}
        </Box>
      )}
    </Paper>
  );
};

export default Homework;
