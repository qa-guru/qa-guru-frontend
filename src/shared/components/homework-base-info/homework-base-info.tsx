import { FC } from "react";
import { Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import UserRow from "shared/components/user-row";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";

import {
  StyledColumnStack,
  StyledRowStack,
  StyledTypography,
} from "./homework-base-info.styled";
import { IHomeworkBaseInfo } from "./homework-base-info.types";

const HomeworkBaseInfo: FC<IHomeworkBaseInfo> = ({
  student,
  mentor,
  creationDate,
  startCheckingDate,
  endCheckingDate,
  iconSize,
}) => {
  const Format = "dd.MM.yyyy | HH:mm";

  return (
    <>
      <StyledRowStack>
        <UserRow
          icon={StudentIcon}
          user={student}
          userId={student?.id}
          hasLink
          {...(iconSize && { width: iconSize.width, height: iconSize.height })}
        />
        {mentor && (
          <UserRow
            icon={MentorIcon}
            user={mentor}
            userId={mentor.id}
            hasLink
            {...(iconSize && {
              width: iconSize.width,
              height: iconSize.height,
            })}
          />
        )}
      </StyledRowStack>
      <StyledRowStack>
        <StyledColumnStack>
          <Typography variant="body2">Создано</Typography>
          <StyledTypography variant="caption">
            {creationDate && format(parseISO(creationDate), Format)}
          </StyledTypography>
        </StyledColumnStack>
        {startCheckingDate && (
          <StyledColumnStack>
            <Typography variant="body2">Начало проверки</Typography>
            <StyledTypography variant="caption">
              {startCheckingDate && format(parseISO(startCheckingDate), Format)}
            </StyledTypography>
          </StyledColumnStack>
        )}
        {endCheckingDate && (
          <StyledColumnStack>
            <Typography variant="body2">Окончание проверки</Typography>
            <StyledTypography variant="caption">
              {endCheckingDate && format(parseISO(endCheckingDate), Format)}
            </StyledTypography>
          </StyledColumnStack>
        )}
      </StyledRowStack>
    </>
  );
};

export default HomeworkBaseInfo;
