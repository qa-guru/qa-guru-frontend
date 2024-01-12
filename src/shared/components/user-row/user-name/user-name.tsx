import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import { IUserName } from "./user-name.types";
import { StyledLink } from "./user-name.styled";

const UserName: FC<IUserName> = ({
  fullName,
  userId,
  hasLink,
  variant = "body2",
}) => {
  const navigate = useNavigate();

  const handleRowClick = () => {
    navigate(`/users/${userId}`);
  };

  return (
    <>
      {hasLink ? (
        <StyledLink component="button" onClick={handleRowClick}>
          <Typography variant={variant}>{fullName}</Typography>
        </StyledLink>
      ) : (
        <Typography variant={variant}>{fullName}</Typography>
      )}
    </>
  );
};

export default UserName;
