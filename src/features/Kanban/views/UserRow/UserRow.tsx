import React from "react";
import { Stack, Typography } from "@mui/material";
import { IUserRow } from "./UserRow.types";
import AvatarCustom from "../../../../shared/components/AvatarCustom";

const UserRow: React.FC<IUserRow> = ({ icon: Icon, user }) => {
  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Icon />
      <AvatarCustom
        fullName={fullName}
        width={26}
        height={26}
        variant="subtitle2"
      />
      <Stack direction="row">
        <Typography variant="body2">{fullName}</Typography>
      </Stack>
    </Stack>
  );
};

export default UserRow;
