import React from "react";
import { Box, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { IUserRow } from "./user-row.types";
import { StyledDateStack, StyledWrapperStack } from "./user-row.styled";
import AvatarCustom from "../avatar-custom";
import { DATE_FORMAT } from "../../constants";

const UserRow: React.FC<IUserRow> = (props) => {
  const {
    icon: Icon,
    user,
    date,
    width,
    height,
    variant = "subtitle1",
  } = props;
  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <StyledWrapperStack>
      {Icon && <Icon />}
      <AvatarCustom
        fullName={fullName}
        width={width}
        height={height}
        variant="subtitle2"
      />
      <Box>
        <Typography variant={variant}>{fullName}</Typography>
        {date && (
          <StyledDateStack>
            <Typography variant="subtitle2">
              {format(parseISO(date), DATE_FORMAT)}
            </Typography>
          </StyledDateStack>
        )}
      </Box>
    </StyledWrapperStack>
  );
};

export default UserRow;
