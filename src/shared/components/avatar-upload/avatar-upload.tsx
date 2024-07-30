import { ChangeEvent, FC } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import { CircularProgress, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useReactiveVar } from "@apollo/client";
import { userIdVar } from "cache";

import { useAvatarDelete, useAvatarUpload, useResponsive } from "shared/hooks";
import AvatarCustom from "shared/components/avatar-custom";

import { IAvatarUpload } from "./avatar-upload.types";
import {
  StyledAvatarButtonStack,
  StyledIconBox,
  StyledIconButton,
  StyledIconButtonDelete,
  VisuallyHiddenInput,
} from "./avatar-upload.styled";

const AvatarUpload: FC<IAvatarUpload> = ({ user, edit }) => {
  const { avatar, firstName, lastName } = user!;
  const { isMobileOrTablet } = useResponsive();

  const { uploadAvatar, uploading } = useAvatarUpload();
  const { deleteAvatar, deleting } = useAvatarDelete();

  const currentUserId = useReactiveVar(userIdVar);
  const fullName = `${firstName} ${lastName}`;
  const isCurrentUser = user?.id === currentUserId;

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];

    if (newImage) await uploadAvatar(newImage);
  };

  const handleDeleteAvatar = async () => {
    await deleteAvatar();
  };

  const renderDesktopButtons = () => (
    <>
      <label htmlFor="icon-button-file">
        {isCurrentUser && (
          <StyledIconButton>
            {uploading ? <CircularProgress size={24} /> : <CameraAltIcon />}
          </StyledIconButton>
        )}
      </label>
      {isCurrentUser && avatar && (
        <StyledIconButtonDelete onClick={handleDeleteAvatar}>
          {deleting ? <CircularProgress size={24} /> : <DeleteIcon />}
        </StyledIconButtonDelete>
      )}
    </>
  );

  const renderMobileButtons = () => (
    <StyledAvatarButtonStack>
      {avatar && (
        <LoadingButton
          sx={{
            color: "app.white",
          }}
          variant="contained"
          loading={deleting}
          startIcon={<DeleteIcon fontSize="small" />}
          onClick={handleDeleteAvatar}
        >
          Удалить фото
        </LoadingButton>
      )}
      <label htmlFor="icon-button-file">
        <LoadingButton
          sx={{
            color: "app.white",
          }}
          variant="contained"
          component="span"
          loading={uploading}
          startIcon={<ImageIcon fontSize="small" />}
        >
          Загрузить фото
        </LoadingButton>
      </label>
    </StyledAvatarButtonStack>
  );

  return (
    <Stack direction="row">
      <VisuallyHiddenInput
        id="icon-button-file"
        type="file"
        onChange={handleImageChange}
      />
      <StyledIconBox>
        <AvatarCustom
          img={avatar}
          fullName={fullName}
          width={{ xs: "100px", sm: "290px", md: "240px" }}
          height={{ xs: "100px", sm: "290px", md: "240px" }}
        />
        {!isMobileOrTablet && renderDesktopButtons()}
      </StyledIconBox>

      {isMobileOrTablet && edit && renderMobileButtons()}
    </Stack>
  );
};

export default AvatarUpload;
