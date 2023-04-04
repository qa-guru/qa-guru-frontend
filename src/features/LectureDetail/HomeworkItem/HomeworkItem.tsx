import React, { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { styled } from "@mui/material/styles";
import { IHomeworkItem } from "./HomeworkItem.types";
import UpdateHomework from "./UpdateHomeworkItem";
import SendHomeWork from "./SendHomeworkItem";
import { ReactComponent as Clock } from "../../../assets/icons/clock.svg";
import { ReactComponent as Search } from "../../../assets/icons/search.svg";
import { ReactComponent as Done } from "../../../assets/icons/done.svg";
import TextSerialization from "../../../shared/Serializers/TextSerialization";
import { red } from "../../../theme/colors";
import Profile from "../Profile/Profile";

const RedHighlightOffIcon = styled(HighlightOffIcon)({
  color: red.main,
});

const style = {
  buttonUpdate: { textTransform: "none", minWidth: "147px", mt: "15px" },
};

const HomeworkItem: React.FC<IHomeworkItem> = (props) => {
  const { dataHomeWorkByLecture, dataUserId } = props;

  const {
    status,
    startCheckingDate,
    endCheckingDate,
    mentor,
    student,
    creationDate,
    answer,
    id,
  } = dataHomeWorkByLecture! || {};

  const [openHomeWorkEdit, setOpenHomeWorkEdit] = useState<boolean>(false);
  const editAccess = dataUserId === student?.id;

  let icon;
  let date;
  let statusText;
  let homework;

  switch (status) {
    case "NEW":
      icon = <Clock />;
      date = null;
      statusText = "Ожидает проверки";
      break;
    case "IN_REVIEW":
      icon = <Search />;
      date = startCheckingDate;
      statusText = "На проверке";
      break;
    case "APPROVED":
      icon = <Done />;
      date = endCheckingDate;
      statusText = "Принято";
      break;
    case "NOT_APPROVED":
      icon = <RedHighlightOffIcon />;
      date = endCheckingDate;
      statusText = "Не принято";
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
    <>
      <Stack
        spacing={{ xs: 1, sm: 3 }}
        direction="row"
        alignItems="center"
        justifyContent={{ xs: "space-between", sm: "stretch" }}
      >
        <Typography variant="h5">Ответ на задание</Typography>
        <Stack
          direction={{ xs: "column-reverse", sm: "row" }}
          spacing={{ xs: 0.5, sm: 2 }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            {icon}
            <Box>
              <Typography variant="subtitle1">{statusText}</Typography>
            </Box>
          </Stack>
          {["NOT_APPROVED", "APPROVED", "IN_REVIEW"].includes(status!) && (
            <Profile
              firstName={mentor?.firstName!}
              lastName={mentor?.lastName!}
              date={date}
            />
          )}
        </Stack>
      </Stack>

      {status && (
        <Box mt="10px">
          <Profile
            firstName={student?.firstName!}
            lastName={student?.lastName!}
            date={creationDate!}
          />
        </Box>
      )}

      <Box mt="7px">{homework}</Box>
      {!openHomeWorkEdit && status && editAccess && (
        <Button
          onClick={() => setOpenHomeWorkEdit(true)}
          sx={style.buttonUpdate}
          variant="contained"
        >
          Редактировать
        </Button>
      )}
    </>
  );
};

export default HomeworkItem;
