import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Link, Typography } from "@mui/material";

import { IUserName } from "./user-name.types";

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
        <Link component="button" onClick={handleRowClick}>
          <Typography variant={variant}>{fullName}</Typography>
        </Link>
      ) : (
        <Typography variant={variant}>{fullName}</Typography>
      )}
    </>
  );
};

export default UserName;
