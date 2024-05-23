import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { format, parseISO } from "date-fns";
import UserRow from "shared/components/user-row";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import StatusText from "shared/components/status-text";
import LectureHomework from "features/lecture-detail/views/lecture-homework";
import { TextView } from "shared/components/text-editor";
import CustomLink from "shared/components/custom-link";

import { IHomeworkDescription } from "./homework-details.types";
import {
  StyledHomeworkDetails,
  StyledBox,
  StyledColumnStack,
  StyledPaper,
  StyledRowStack,
  StyledStack,
  StyledTitle,
  StyledTypography,
  StyledId,
  StyledIconButton,
  StyledStatusContentBox,
  StyledIcon,
} from "./homework-details.styled";
import { getFormattedId } from "../../helpers/get-formatted-id";

const HomeworkDetails: FC<IHomeworkDescription> = ({ card, onClose }) => {
  const Format = "dd.MM.yyyy | HH:mm";

  return (
    <StyledHomeworkDetails>
      <StyledBox>
        <StyledStack>
          <CustomLink path={`/kanban-mentor/${card.id}`}>
            <StyledId>
              <Typography variant="h4">
                {getFormattedId(card?.training?.techStack, card.id)}
              </Typography>
              <StyledIcon />
            </StyledId>
          </CustomLink>
        </StyledStack>
        <StyledIconButton onClick={onClose}>
          <ChevronRightIcon />
        </StyledIconButton>
        <Typography variant="h5">{card.lecture?.subject}</Typography>
        <StyledRowStack>
          <UserRow
            icon={StudentIcon}
            user={card.student}
            width={26}
            height={26}
            userId={card.student?.id}
            hasLink
          />
          {card.mentor && (
            <UserRow
              icon={MentorIcon}
              user={card.mentor}
              width={26}
              height={26}
              userId={card.mentor.id}
              hasLink
            />
          )}
        </StyledRowStack>
        <StyledRowStack>
          <StyledColumnStack>
            <Typography variant="body2">Создано</Typography>
            <StyledTypography variant="caption">
              {card.creationDate && format(parseISO(card.creationDate), Format)}
            </StyledTypography>
          </StyledColumnStack>
          {card.startCheckingDate && (
            <StyledColumnStack>
              <Typography variant="body2">Начало проверки</Typography>
              <StyledTypography variant="caption">
                {card.startCheckingDate &&
                  format(parseISO(card.startCheckingDate), Format)}
              </StyledTypography>
            </StyledColumnStack>
          )}
          {card.endCheckingDate && (
            <StyledColumnStack>
              <Typography variant="body2">Окончание проверки</Typography>
              <Typography variant="caption">
                {card.endCheckingDate &&
                  format(parseISO(card.endCheckingDate), Format)}
              </Typography>
            </StyledColumnStack>
          )}
        </StyledRowStack>
        <StyledStatusContentBox>
          <StatusText status={card.status} />
        </StyledStatusContentBox>
        <LectureHomework lectureHomeWork={card.lecture?.contentHomeWork} />
        <StyledPaper>
          <StyledTitle variant="h5">Ответ на задание</StyledTitle>
          <Stack>
            <TextView content={card.answer} />
          </Stack>
        </StyledPaper>
      </StyledBox>
    </StyledHomeworkDetails>
  );
};

export default HomeworkDetails;
