import React from "react";
import { Box, Button, Paper, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { format, parseISO } from "date-fns";
import { style } from "./styles";
import { IHomeworkDetail } from "./HomeworkDetails.types";
import { getFormattedId } from "../../helpers/getFormattedId";
import UserRow from "../../../../shared/components/UserRow";
import { ReactComponent as MentorIcon } from "../../../../assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "../../../../assets/icons/student.svg";
import StatusContent from "../../../../shared/components/StatusContent";
import TextSerialization from "../../../../shared/Serializers/TextSerialization";
import LectureHomework from "../../../../shared/components/LectureHomework";

const HomeworkDetails: React.FC<IHomeworkDetail> = ({ card, onClose }) => {
  const Format = "dd.MM.yyyy | HH:mm";

  return (
    <Box sx={style.menu}>
      <Stack spacing={1} direction="row" justifyContent={"space-between"}>
        <Typography variant="h6">{getFormattedId(card.id!)}</Typography>
        <Button onClick={onClose} variant="contained">
          Свернуть <ChevronRightIcon />
        </Button>
      </Stack>
      <Typography variant="body1" mt="2vh">
        {card.lecture?.subject}
      </Typography>
      <Stack spacing={2} direction="row" mt="15px">
        <UserRow
          icon={StudentIcon}
          user={card.student!}
          width={26}
          height={26}
        />
        {card.mentor && (
          <UserRow
            icon={MentorIcon}
            user={card.mentor}
            width={26}
            height={26}
          />
        )}
      </Stack>
      <Stack spacing={2} direction="row" mt={2}>
        <Stack direction="column">
          <Typography variant="body2">Создано</Typography>
          <Typography variant="caption" noWrap>
            {card.creationDate && format(parseISO(card.creationDate), Format)}
          </Typography>
        </Stack>
        {card.startCheckingDate && (
          <Stack direction="column">
            <Typography variant="body2">Начало проверки</Typography>
            <Typography variant="caption" noWrap>
              {card.startCheckingDate &&
                format(parseISO(card.startCheckingDate), Format)}
            </Typography>
          </Stack>
        )}
        {card.endCheckingDate && (
          <Stack direction="column">
            <Typography variant="body2">Окончание проверки</Typography>
            <Typography variant="caption">
              {card.endCheckingDate &&
                format(parseISO(card.endCheckingDate), Format)}
            </Typography>
          </Stack>
        )}
      </Stack>
      <Box mt="15px">
        <StatusContent status={card.status!} />
      </Box>
      <LectureHomework lectureHomeWork={card.lecture?.contentHomeWork!} />
      <Paper sx={style.paper}>
        <Typography variant="h5" mb={2}>
          Ответ на задание
        </Typography>
        <TextSerialization text={card.answer!} />
      </Paper>
    </Box>
  );
};

export default HomeworkDetails;
