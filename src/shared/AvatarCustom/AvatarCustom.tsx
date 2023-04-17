import React from "react";
import Avatar from "@mui/material/Avatar";
import { IAvatarCustom } from "./AvatarCustom.types";
import { Typography } from "@mui/material";

function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

const AvatarCustom: React.FC<IAvatarCustom> = ({
  fullName,
  width,
  height,
  variant = "h6",
}) => {
  return (
    <Avatar sx={{ width, height, ...stringAvatar(fullName).sx }}>
      <Typography variant={variant}>
        {stringAvatar(fullName).children}
      </Typography>
    </Avatar>
  );
};

export default AvatarCustom;
