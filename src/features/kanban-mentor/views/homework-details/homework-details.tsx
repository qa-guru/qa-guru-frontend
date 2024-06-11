import { FC } from "react";
import { Stack, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import StatusText from "shared/components/status-text";
import LectureHomework from "shared/features/lecture-homework";
import { TextView } from "shared/components/text-editor";
import CustomLink from "shared/components/custom-link";
import HomeworkBaseInfo from "shared/components/homework-base-info";
import { formatId } from "shared/helpers/format-id";

import { IHomeworkDescription } from "./homework-details.types";
import {
  StyledBox,
  StyledHomeworkDetails,
  StyledIcon,
  StyledIconButton,
  StyledId,
  StyledPaper,
  StyledStack,
  StyledStatusContentBox,
  StyledTitle,
} from "./homework-details.styled";

const HomeworkDetails: FC<IHomeworkDescription> = ({ card, onClose }) => {
  const {
    lecture,
    training,
    student,
    mentor,
    creationDate,
    startCheckingDate,
    endCheckingDate,
    status,
    answer,
    id,
  } = card;

  return (
    <StyledHomeworkDetails>
      <StyledBox>
        <StyledStack>
          <CustomLink
            path={`/kanban-mentor/${id}`}
            color="black"
            textDecorationHover="underline"
          >
            <StyledId>
              <Typography textTransform="uppercase" variant="h5">
                {formatId(training?.techStack, id)}
              </Typography>
              <StyledIcon fontSize="small" />
            </StyledId>
          </CustomLink>
        </StyledStack>
        <StyledIconButton onClick={onClose}>
          <ChevronRightIcon />
        </StyledIconButton>
        <Typography variant="h5">{lecture?.subject}</Typography>
        <HomeworkBaseInfo
          student={student}
          mentor={mentor}
          creationDate={creationDate}
          startCheckingDate={startCheckingDate}
          endCheckingDate={endCheckingDate}
          iconSize={{ width: 26, height: 26 }}
        />
        <StyledStatusContentBox>
          <StatusText status={status} />
        </StyledStatusContentBox>
        <LectureHomework lectureHomeWork={lecture?.contentHomeWork} />
        <StyledPaper>
          <StyledTitle variant="h5">Ответ на задание</StyledTitle>
          <Stack>
            <TextView content={answer} />
          </Stack>
        </StyledPaper>
      </StyledBox>
    </StyledHomeworkDetails>
  );
};

export default HomeworkDetails;
