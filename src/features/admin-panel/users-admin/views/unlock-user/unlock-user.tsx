import { FC } from "react";
import { LockOpen } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";

import { IUnlockUser } from "./unlock-user.types";
import { StyledButton } from "./unlock-user.styled";

const UnlockUser: FC<IUnlockUser> = ({ unlockUser, id, loading }) => {
  const handleLockOpen = () => {
    if (id)
      unlockUser({
        variables: { id },
      });
  };

  return (
    <StyledButton
      variant="outlined"
      onClick={handleLockOpen}
      startIcon={
        loading ? (
          <CircularProgress color="primary" size={20} />
        ) : (
          <LockOpen color="primary" fontSize="small" />
        )
      }
      disabled={loading}
    >
      Разблокировать пользователя
    </StyledButton>
  );
};

export default UnlockUser;
