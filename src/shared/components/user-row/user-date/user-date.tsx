import { FC } from "react";
import { Typography } from "@mui/material";
import { format, parseISO } from "date-fns";

import { DATE_FORMAT } from "../../../constants";
import { StyledDateStack } from "./user-date.styled";
import { IUserDate } from "./user-date.types";

const UserDate: FC<IUserDate> = ({ date }) => {
  return (
    <StyledDateStack>
      <Typography variant="subtitle2">
        {format(parseISO(date), DATE_FORMAT)}
      </Typography>
    </StyledDateStack>
  );
};

export default UserDate;
