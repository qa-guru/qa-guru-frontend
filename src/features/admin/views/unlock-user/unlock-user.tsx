import { Maybe, UnlockUserMutationFn } from "api/graphql/generated/graphql";
import { FC } from "react";
import { LockOpen } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

interface IUnlockUser {
  unlockUser: UnlockUserMutationFn;
  id: Maybe<string> | undefined;
}

const UnlockUser: FC<IUnlockUser> = ({ unlockUser, id }) => {
  const handleLockOpen = () => {
    if (id)
      unlockUser({
        variables: { id },
      });
  };

  return (
    <Tooltip title="Разблокировать">
      <IconButton onClick={handleLockOpen}>
        <LockOpen color="primary" />
      </IconButton>
    </Tooltip>
  );
};

export default UnlockUser;
