import { FC } from "react";
import Avatar from "@mui/material/Avatar";
import { useTheme } from "@mui/system";
import { useReactiveVar } from "@apollo/client";

import { userIdVar } from "cache";

import { IAvatarCustom } from "./avatar-custom.types";
import { StyledTypography } from "./avatar-custom.styled";
import CustomLink from "../custom-link";

function stringToColor(name: string) {
  const theme = useTheme();
  const color = theme.palette.app;

  const colors = [
    color.primary,
    color.secondary,
    color.pink,
    color.amber,
    color.indigo,
    color.lightBlue,
    color.green,
    color.cyan,
    color.teal,
    color.blueGrey,
  ];

  const index = Math.abs(hashCode(name)) % colors.length;
  return colors[index];
}

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
  variant = "body2",
  userId,
  hasLink,
  img,
}) => {
  const currentUserId = useReactiveVar(userIdVar);
  const isCurrentUser = userId === currentUserId;
  const profilePath = isCurrentUser ? "/profile" : `/${userId}`;

  const renderLink = () => (
    <CustomLink path={profilePath} opacity="0.7">
      <Avatar
        src={`data:image/png;base64, ${img}` || ""}
        variant="rounded"
        sx={{ width, height, ...stringAvatar(fullName).sx }}
        alt="Avatar"
      >
        <StyledTypography variant={variant}>
          {stringAvatar(fullName).children}
        </StyledTypography>
      </Avatar>
    </CustomLink>
  );

  const renderAvatar = () => (
    <Avatar
      src={`data:image/png;base64, ${img}`}
      variant="rounded"
      sx={{ width, height, ...stringAvatar(fullName).sx }}
    >
      <StyledTypography variant={variant}>
        {stringAvatar(fullName).children}
      </StyledTypography>
    </Avatar>
  );

  return hasLink ? renderLink() : renderAvatar();
};

export default AvatarCustom;
