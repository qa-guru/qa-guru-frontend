import React from "react";
import { Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import { format, parseISO } from "date-fns";
import StatusContent from "shared/components/status-content";
import UserRow from "shared/components/user-row";
import LectureHomework from "shared/components/lecture-homework";
import TextSerialization from "shared/serializers/text-serialization";
import { IHomeworkDescriptionFullpage } from "./homework-details-fullpage.types";
import {
  StyledAnswerPaper,
  StyledColumnStack,
  StyledIcon,
  StyledNavigateButton,
  StyledRowStack,
  StyledStack,
  StyledTitle,
  StyledTypography,
} from "./homework-details-fullpage.styled";
import { getFormattedId } from "../../helpers/get-formatted-id";

const HomeworkDetailsFullpage: React.FC<IHomeworkDescriptionFullpage> = ({
  data,
}) => {
  const navigate = useNavigate();
  const Format = "dd.MM.yyyy | HH:mm";

  const handleBack = () => {
    navigate(`/kanban`);
  };

  return (
    <Container>
      <StyledNavigateButton variant="outlined" onClick={handleBack}>
        <StyledIcon />
        <StyledTypography variant="subtitle1">К доске заданий</StyledTypography>
      </StyledNavigateButton>
      <StyledTitle variant="h6">
        {getFormattedId(data!.homeWork?.lecture!.id!)}
      </StyledTitle>
      <Typography variant="h4">{data!.homeWork?.lecture?.subject}</Typography>
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
        <StyledAnswerPaper>
          <StyledTitle variant="h5">Ответ на задание</StyledTitle>
          <TextSerialization text={data!.homeWork?.answer!} />
        </StyledAnswerPaper>
      </StyledStack>
    </Container>
  );
};

export default HomeworkDetailsFullpage;
