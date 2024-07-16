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

  const renderAvatar = () =>
    !hideAvatar && (
      <AvatarCustom
        fullName={fullName}
        width={width}
        height={height}
        userId={userId}
        hasLink={hasLink}
        img={user?.avatar}
      />
    );

  const renderFullName = () =>
    !hideFullName && (
      <UserName
        fullName={fullName}
        userId={userId}
        hasLink={hasLink}
        variant={variant}
      />
    );

  const renderRating = () =>
    !hideRating && <Rating user={user} rating={rating} />;

  const renderRoles = () =>
    !hideRoles && (
      <Typography variant="caption" color="textSecondary">
        {formatRole(roles)}
      </Typography>
    );

  const renderDate = () => date && <UserDate date={date} />;

  const renderEmail = () =>
    email && <Typography variant="caption">{email}</Typography>;

  return (
    <StyledWrapperStack hideFullName={hideFullName}>
      {Icon && <Icon />}
      {renderAvatar()}
      <StyledBox>
        <StyledStack>
          {renderFullName()}
          {renderRating()}
        </StyledStack>
        {renderRoles()}
        {renderDate()}
        {renderEmail()}
      </StyledBox>
    </StyledWrapperStack>
  );
};

export default UserRow;
