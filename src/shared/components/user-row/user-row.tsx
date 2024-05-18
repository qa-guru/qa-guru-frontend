import { FC } from "react";
import { Typography } from "@mui/material";

import { IUserRow } from "./user-row.types";
import { StyledBox, StyledStack, StyledWrapperStack } from "./user-row.styled";
import AvatarCustom from "../avatar-custom";
import { formatRole } from "../../helpers";
import Rating from "../rating/rating";
import UserName from "./user-name/user-name";
import UserDate from "./user-date/user-date";

const UserRow: FC<IUserRow> = (props) => {
  const {
    icon: Icon,
    user,
    email,
    date,
    width,
    height,
    roles,
    variant,
    hideFullName,
    hideRoles,
    hideAvatar,
    hideRating,
    firstName,
    lastName,
    rating,
    userId,
    hasLink,
  } = props;

  const fullName = user
    ? `${user.firstName} ${user.lastName}`
    : `${firstName} ${lastName}`;

  return (
    <StyledWrapperStack hideFullName={hideFullName}>
      {Icon && <Icon />}

      {!hideAvatar && (
        <AvatarCustom
          fullName={fullName}
          width={width}
          height={height}
          userId={userId}
          hasLink={hasLink}
          img={user?.avatar}
        />
      )}

      <StyledBox>
        <StyledStack>
          {!hideFullName && (
            <UserName
              fullName={fullName}
              userId={userId}
              hasLink={hasLink}
              variant={variant}
            />
          )}
          {!hideRating && <Rating user={user} rating={rating} />}
        </StyledStack>

        {!hideRoles && (
          <Typography variant="caption">{formatRole(roles)}</Typography>
        )}

        {date && <UserDate date={date} />}
        {email && <Typography variant="caption">{email}</Typography>}
      </StyledBox>
    </StyledWrapperStack>
  );
};

export default UserRow;
