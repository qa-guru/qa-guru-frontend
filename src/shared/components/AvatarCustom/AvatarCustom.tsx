import React from "react";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";
import { IAvatarCustom } from "./AvatarCustom.types";

function stringToColor(name: string) {
  const colors = [
    "#FFA000",
    "#6750A4",
    "#2CCCA6",
    "#0288D1",
    "#6750A4",
    "#C2185B",
    "#388E3C",
    "#0097A7",
    "#00796B",
    "#455A64",
  ];
  const index = Math.abs(hashCode(name)) % colors.length;
  return colors[index];
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
