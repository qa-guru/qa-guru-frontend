import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { IUserRow } from "./UserRow.types";
import AvatarCustom from "../AvatarCustom";

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
    <Stack direction="row" spacing={1.7} alignItems="center">
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
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="subtitle2">
              {format(parseISO(date), "dd.MM.yyyy '|' HH:mm")}
            </Typography>
          </Stack>
        )}
      </Box>
    </Stack>
  );
};

export default UserRow;
