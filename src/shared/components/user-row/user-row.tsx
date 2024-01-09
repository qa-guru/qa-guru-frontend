import { FC } from "react";
import { Link, Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";

import { IUserRow } from "./user-row.types";
import {
  StyledBox,
  StyledDateStack,
  StyledLink,
  StyledRatingChip,
  StyledStack,
  StyledWrapperStack,
} from "./user-row.styled";
import AvatarCustom from "../avatar-custom";
import { DATE_FORMAT } from "../../constants";
import { formatRole } from "../../helpers";

const UserRow: FC<IUserRow> = (props) => {
  const {
    icon: Icon,
    user,
    email,
    date,
    width,
    height,
    roles,
    variant = "body2",
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

  const navigate = useNavigate();

  let fullName;

  if (user) {
    fullName = `${user?.firstName} ${user?.lastName}`;
  } else {
    fullName = `${firstName} ${lastName}`;
  }

  const handleRowClick = () => {
    navigate(`/users/${userId}`);
  };

  return (
    <StyledWrapperStack>
      {Icon && <Icon />}

      {!hideAvatar && (
        <AvatarCustom
          fullName={fullName}
          width={width}
          height={height}
          variant="subtitle2"
        />
      )}

      <StyledBox>
        <StyledStack>
          {!hideFullName && (
            <>
              {hasLink ? (
                <StyledLink component="button" onClick={handleRowClick}>
                  <Typography variant={variant}>{fullName}</Typography>
                </StyledLink>
              ) : (
                <Typography variant={variant}>{fullName}</Typography>
              )}
            </>
          )}
          {!hideRating && (
            <StyledRatingChip
              size="small"
              variant="outlined"
              label={rating ? rating?.rating : user?.rating?.rating}
            />
          )}
        </StyledStack>

        {!hideRoles && (
          <Typography variant="caption">{formatRole(roles)}</Typography>
        )}

        {date && (
          <StyledDateStack>
            <Typography variant="subtitle2">
              {format(parseISO(date), DATE_FORMAT)}
            </Typography>
          </StyledDateStack>
        )}
        {email && <Typography variant="caption">{email}</Typography>}
      </StyledBox>
    </StyledWrapperStack>
  );
};

export default UserRow;
