import React from "react";
import { Container, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import { format, parseISO } from "date-fns";
import StatusContent from "shared/components/status-content";
import UserRow from "shared/components/user-row";
import LectureHomework from "shared/components/lecture-homework";
import TextSerialization from "shared/serializers/text-serialization";
import Homework from "features/lecture-detail/views/homework";
import { IHomeworkDescriptionFullpage } from "./homework-details-fullpage.types";
import {
  StyledColumnStack,
  StyledIconButton,
  StyledPaper,
  StyledRowStack,
  StyledStack,
  StyledTitle,
} from "./homework-details-fullpage.styled";
import { getFormattedId } from "../../helpers/get-formatted-id";

const HomeworkDetailsFullpage: React.FC<IHomeworkDescriptionFullpage> = ({
  data,
  dataUserId,
}) => {
  const navigate = useNavigate();
  const Format = "dd.MM.yyyy | HH:mm";

  const handleBack = () => {
    navigate(`/kanban`);
  };

  return (
    <Container>
      <StyledTitle variant="h6">
        {getFormattedId(data!.homeWork?.lecture!.id!)}
      </StyledTitle>
      <StyledRowStack>
        <Typography variant="h4">{data!.homeWork?.lecture?.subject}</Typography>
        <StyledIconButton onClick={handleBack}>
          <ChevronRightIcon />
        </StyledIconButton>
      </StyledRowStack>
      <StyledStack>
        <StyledRowStack>
          <UserRow icon={StudentIcon} user={data!.homeWork?.student!} />
          {data!.homeWork?.mentor && (
            <UserRow icon={MentorIcon} user={data!.homeWork?.mentor} />
          )}
        </StyledRowStack>
        <StyledRowStack>
          <StyledColumnStack>
            <Typography variant="body2">Создано</Typography>
            <Typography variant="caption">
              {data.homeWork?.creationDate &&
                format(parseISO(data.homeWork?.creationDate), Format)}
            </Typography>
          </StyledColumnStack>
          {data.homeWork?.startCheckingDate && (
            <StyledColumnStack>
              <Typography variant="body2">Начало проверки</Typography>
              <Typography variant="caption">
                {data.homeWork?.startCheckingDate &&
                  format(parseISO(data.homeWork?.startCheckingDate), Format)}
              </Typography>
            </StyledColumnStack>
          )}
          {data.homeWork?.endCheckingDate && (
            <StyledColumnStack>
              <Typography variant="body2">Окончание проверки</Typography>
              <Typography variant="caption">
                {data!.homeWork?.endCheckingDate &&
                  format(parseISO(data.homeWork?.endCheckingDate), Format)}
              </Typography>
            </StyledColumnStack>
          )}
        </StyledRowStack>
        <StatusContent status={data.homeWork?.status!} />
        <LectureHomework
          lectureHomeWork={data.homeWork?.lecture?.contentHomeWork!}
        />
        <StyledPaper>
          <StyledTitle variant="h5">Ответ на задание</StyledTitle>
          <TextSerialization text={data!.homeWork?.answer!} />
        </StyledPaper>
      </StyledStack>
      <Homework
        dataHomeWorkByLecture={data.homeWork!}
        dataUserId={dataUserId!}
      />
    </Container>
  );
};

export default HomeworkDetailsFullpage;
