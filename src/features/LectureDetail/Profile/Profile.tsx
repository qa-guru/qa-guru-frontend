import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { format, parseISO } from "date-fns";
import { IProfile } from "./Profile.types";

const style = {
  avatar: {
    width: 40,
    height: 40,
  },
};

const Profile: React.FC<IProfile> = (props) => {
  const { firstName, lastName, date } = props;

  return (
    <Stack spacing={1.7} direction="row" alignItems="center">
      <Avatar
        sx={style.avatar}
        alt="Remy Sharp"
        src="/static/images/avatar/1.jpg"
      />
      <Box>
        <Typography variant="subtitle1">
          {firstName} {lastName}
        </Typography>
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
