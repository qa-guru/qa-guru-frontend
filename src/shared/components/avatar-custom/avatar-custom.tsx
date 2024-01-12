import { FC } from "react";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";

import { IAvatarCustom } from "./avatar-custom.types";
import { COLORS } from "../../constants";

function stringToColor(name: string) {
  const index = Math.abs(hashCode(name)) % COLORS.length;
  return COLORS[index];
}

/* eslint-disable no-bitwise */

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return hash;
}

/* eslint-enable no-bitwise */

function stringAvatar(name: string) {
  return {
    sx: {
      backgroundColor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const AvatarCustom: FC<IAvatarCustom> = ({
  fullName,
  width,
  height,
  variant,
}) => {
  return (
    <Avatar
      variant="rounded"
      sx={{ width, height, ...stringAvatar(fullName).sx }}
    >
      <Typography variant={variant}>
        {stringAvatar(fullName).children}
      </Typography>
    </Avatar>
  );
};

export default AvatarCustom;
