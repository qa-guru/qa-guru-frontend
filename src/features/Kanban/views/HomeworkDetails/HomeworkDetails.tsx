import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { format, parseISO } from "date-fns";
import { style } from "./styles";
import { IHomeworkDetail } from "./HomeworkDetails.types";
import { getFormattedId } from "../../helpers/getFormattedId";
import UserRow from "../UserRow";
import { ReactComponent as MentorIcon } from "../../../../assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "../../../../assets/icons/student.svg";
import StatusContent from "../../../../shared/components/StatusContent";
import LectureHomework from "../../containers/LectureHomework";
import TextSerialization from "../../../../shared/Serializers/TextSerialization";

const HomeworkDetails: React.FC<IHomeworkDetail> = ({ card, onClose }) => {
  const Format = "dd.MM.yyyy | HH:mm";
  console.log(card);

  return (
    <Box sx={style.menu}>
      <Stack
        spacing={1}
        direction="row"
        mt="5px"
        justifyContent={"space-between"}
      >
        <Typography variant="h6">{getFormattedId(card.id!)}</Typography>
        <Button onClick={onClose} variant="contained">
          Свернуть <ChevronRightIcon />
        </Button>
      </Stack>
      <Typography variant="body1" mt="10px">
        {card.lecture?.subject}
      </Typography>
      <Stack spacing={2} direction="row" mt="15px">
        <UserRow icon={StudentIcon} user={card.student!} />
        {card.mentor && <UserRow icon={MentorIcon} user={card.mentor} />}
      </Stack>
      <Stack spacing={1} direction="row" mt="10px">
        <Stack direction="column">
          <Typography variant="body2">Создано</Typography>
          <Typography variant="caption">
            {card.creationDate && format(parseISO(card.creationDate), Format)}
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography variant="body2">Начало проверки</Typography>
          <Typography variant="caption">
            {card.startCheckingDate &&
              format(parseISO(card.startCheckingDate), Format)}
          </Typography>
        </Stack>
        <Stack direction="column">
          <Typography variant="body2">Окончание проверки</Typography>
          <Typography variant="caption">
            {card.endCheckingDate &&
              format(parseISO(card.endCheckingDate), Format)}
          </Typography>
        </Stack>
      </Stack>
      <Box mt="10px">
        <StatusContent status={card.status!} />
      </Box>
      <LectureHomework lectureId={card.lecture?.id!} />
      <Typography variant="h5">Ответ на задание</Typography>
      <TextSerialization text={card.answer!} />
    </Box>
  );
};

export default HomeworkDetails;
