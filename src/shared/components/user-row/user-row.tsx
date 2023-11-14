import { FC } from "react";
import { Typography } from "@mui/material";
import { format, parseISO } from "date-fns";
import { IUserRow } from "./user-row.types";
import {
  StyledBox,
  StyledDateStack,
  StyledWrapperStack,
} from "./user-row.styled";
import AvatarCustom from "../avatar-custom";
import { DATE_FORMAT } from "../../constants";
import { formatRole } from "../../hooks/format-role";

const UserRow: FC<IUserRow> = (props) => {
  const {
    icon: Icon,
    user,
    email,
    date,
    width,
    height,
    variant = "subtitle1",
    roles,
  } = props;
  const fullName = `${user?.firstName} ${user?.lastName}`;

  return (
    <StyledWrapperStack>
      {Icon && <Icon />}
      <AvatarCustom
        fullName={fullName}
        width={width}
        height={height}
        variant="subtitle2"
      />
      <StyledBox>
        <Typography variant={variant}>{fullName}</Typography>
        {roles && roles.length > 0 && (
          <Typography variant="caption">
            {formatRole(roles[roles.length - 1])}
          </Typography>
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
