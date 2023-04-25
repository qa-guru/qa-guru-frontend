import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { IProfile } from "./Profile.types";
import AvatarCustom from "../../../../shared/AvatarCustom";

const Profile: React.FC<IProfile> = (props) => {
  const { firstName, lastName, date } = props;

  const fullName = `${firstName} ${lastName}`;

  return (
    <Stack spacing={1.7} direction="row" alignItems="center">
      <AvatarCustom fullName={fullName} />
      <Box>
        <Typography variant="subtitle1">{fullName}</Typography>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="subtitle2">
            {format(parseISO(date), "dd.MM.yyyy '|' HH:mm")}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Profile;
