import { FC } from "react";
import { Typography } from "@mui/material";
import { format, parseISO } from "date-fns";

import { DATE_FORMAT } from "shared/constants";

import { StyledDateStack } from "./user-date.styled";
import { IUserDate } from "./user-date.types";

const UserDate: FC<IUserDate> = ({ date }) => {
  return (
    <StyledDateStack>
      <Typography variant="caption" color="textSecondary">
        {format(parseISO(date), DATE_FORMAT)}
      </Typography>
    </StyledDateStack>
  );
};

export default UserDate;
