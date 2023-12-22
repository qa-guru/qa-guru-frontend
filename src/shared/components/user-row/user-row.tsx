import { FC } from "react";
import { Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { formatRole } from "shared/helpers/format-role";

import { IUserRow } from "./user-row.types";
import {
  StyledBox,
  StyledDateStack,
  StyledFullNameTypography,
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
  } = props;
  const fullName = `${user?.firstName} ${user?.lastName}`;

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
            <StyledFullNameTypography variant={variant}>
              {fullName}
            </StyledFullNameTypography>
            {roles && roles.length > 0 && (
              <Typography variant="caption">
                {formatRole(roles[roles.length - 1])}
              </Typography>
            )}
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
