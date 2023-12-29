import { FC } from "react";
import { Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { formatRole } from "shared/helpers";

import { IUserRow } from "./user-row.types";
import {
  StyledBox,
  StyledDateStack,
  StyledRatingChip,
  StyledStack,
  StyledWrapperStack,
} from "./user-row.styled";
import AvatarCustom from "../avatar-custom";
import { DATE_FORMAT } from "../../constants";

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
    hideAvatar,
    firstName,
    lastName,
    rating,
  } = props;

  let fullName;

  if (user) {
    fullName = `${user?.firstName} ${user?.lastName}`;
  } else {
    fullName = `${firstName} ${lastName}`;
  }

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
        {!hideFullName && (
          <>
            <StyledStack>
              <Typography variant={variant}>{fullName}</Typography>
              <StyledRatingChip
                size="small"
                variant="outlined"
                label={rating ? rating?.rating : user?.rating?.rating}
              />
            </StyledStack>
            <Typography variant="caption">{formatRole(roles)}</Typography>
          </>
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
