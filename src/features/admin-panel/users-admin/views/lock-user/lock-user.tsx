import { FC } from "react";
import { Lock } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

import { ILockUser } from "./lock-user.types";
import { StyledButton } from "./lock-user.styled";

const LockUser: FC<ILockUser> = ({ lockUser, id, loading }) => {
  const handleLock = async () => {
    if (id)
      await lockUser({
        variables: { id },
      });
  };

  return (
    <StyledButton
      variant="outlined"
      onClick={handleLock}
      startIcon={
        loading ? (
          <CircularProgress color="primary" size={20} />
        ) : (
          <Lock color="primary" fontSize="small" />
        )
      }
      disabled={loading}
    >
      Заблокировать пользователя
    </StyledButton>
  );
};

export default LockUser;
