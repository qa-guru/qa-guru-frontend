import { FC } from "react";
import { Typography } from "@mui/material";
import { useUserIdQuery } from "api/graphql/generated/graphql";

import { IUserName } from "./user-name.types";
import { StyledLink } from "./user-name.styled";

const UserName: FC<IUserName> = ({
  fullName,
  userId,
  hasLink,
  variant = "body2",
}) => {
  const { data } = useUserIdQuery();

  const currentUserId = data?.user?.id;
  const isCurrentUser = userId === currentUserId;

  const profilePath = isCurrentUser ? "/profile" : `/${userId}`;

  return (
    <>
      {hasLink ? (
        <StyledLink href={profilePath} key={userId}>
          <Typography variant={variant} color="primary">
            {fullName}
          </Typography>
        </StyledLink>
      ) : (
        <Typography variant={variant} color="primary">
          {fullName}
        </Typography>
      )}
    </>
  );
};

export default UserName;
