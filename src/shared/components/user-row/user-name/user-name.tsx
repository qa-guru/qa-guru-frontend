import { FC } from "react";
import { Typography } from "@mui/material";
import { useReactiveVar } from "@apollo/client";
import { userIdVar } from "cache";

import { IUserName } from "./user-name.types";
import CustomLink from "../../custom-link";

const UserName: FC<IUserName> = ({
  fullName,
  userId,
  hasLink,
  variant = "body2",
}) => {
  const currentUserId = useReactiveVar(userIdVar);
  const isCurrentUser = userId === currentUserId;
  const profilePath = isCurrentUser ? "/profile" : `/${userId}`;

  const renderLink = () => (
    <CustomLink path={profilePath} textDecorationHover="underline">
      <Typography variant={variant} color="primary">
        {fullName}
      </Typography>
    </CustomLink>
  );

  const renderFullName = () => (
    <Typography variant={variant} color="primary">
      {fullName}
    </Typography>
  );

  return hasLink ? renderLink() : renderFullName();
};

export default UserName;
