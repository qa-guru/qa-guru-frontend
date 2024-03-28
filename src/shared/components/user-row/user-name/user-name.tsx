import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Typography } from "@mui/material";

import { IUserName } from "./user-name.types";
import { StyledLink } from "./user-name.styled";
import { useUserIdQuery } from "../../../../api/graphql/generated/graphql";

const UserName: FC<IUserName> = ({
  fullName,
  userId,
  hasLink,
  variant = "body2",
}) => {
  const { data } = useUserIdQuery();

  const navigate = useNavigate();
  const currentUserId = data?.user?.id;

  const handleRowClick = () => {
    if (userId === currentUserId) {
      navigate("/profile");
    } else navigate(`/${userId}`);
  };

  return (
    <>
      {hasLink ? (
        <StyledLink component="button" onClick={handleRowClick}>
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
