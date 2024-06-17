import { FC } from "react";
import { Typography } from "@mui/material";
import { useUserIdQuery } from "api/graphql/generated/graphql";

import { IUserName } from "./user-name.types";
import CustomLink from "../../custom-link";

const UserName: FC<IUserName> = ({
  fullName,
  userId,
  hasLink,
  variant = "body2",
}) => {
  const { data } = useUserIdQuery({ fetchPolicy: "cache-first" });

  const currentUserId = data?.user?.id;
  const isCurrentUser = userId === currentUserId;
  const profilePath = isCurrentUser ? "/profile" : `/${userId}`;

  const fullNameLink = (
    <CustomLink path={profilePath} textDecorationHover="underline">
      <Typography variant={variant} color="primary">
        {fullName}
      </Typography>
    </CustomLink>
  );

  const plainFullName = (
    <Typography variant={variant} color="primary">
      {fullName}
    </Typography>
  );

  return hasLink ? fullNameLink : plainFullName;
};

export default UserName;
