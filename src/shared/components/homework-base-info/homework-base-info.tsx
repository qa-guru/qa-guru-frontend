import { ComponentType, FC } from "react";
import { Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import UserRow from "shared/components/user-row";
import { ReactComponent as MentorIcon } from "assets/icons/mentor.svg";
import { ReactComponent as StudentIcon } from "assets/icons/student.svg";
import { Maybe, UserDto } from "api/graphql/generated/graphql";

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

  const renderUserRow = (
    user?: Maybe<UserDto>,
    icon?: ComponentType,
    iconSize?: { width: number; height: number }
  ) => (
    <UserRow
      icon={icon}
      user={user}
      userId={user?.id}
      hasLink
      {...(iconSize && { width: iconSize.width, height: iconSize.height })}
    />
  );

  console.log(creationDate, startCheckingDate, endCheckingDate);

  const renderDate = (label: string, date?: string) =>
    date && (
      <StyledColumnStack>
        <Typography variant="body2">{label}</Typography>
        <StyledTypography variant="caption">
          {format(parseISO(date), Format)}
        </StyledTypography>
      </StyledColumnStack>
    );

  return (
    <>
      <StyledRowStack>
        {renderUserRow(student, StudentIcon, iconSize)}
        {mentor && renderUserRow(mentor, MentorIcon, iconSize)}
      </StyledRowStack>
      <StyledRowStack>
        {renderDate("Создано", creationDate)}
        {renderDate("Начало проверки", startCheckingDate)}
        {renderDate("Окончание проверки", endCheckingDate)}
      </StyledRowStack>
    </>
  );
};

export default HomeworkBaseInfo;
