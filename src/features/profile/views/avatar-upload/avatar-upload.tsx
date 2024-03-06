import { ChangeEvent, FC } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import AvatarCustom from "shared/components/avatar-custom";
import { CircularProgress, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useResponsive from "shared/hooks/use-responsive";

import { useAvatarUpload } from "../../hooks/use-avatar-upload";
import { useAvatarDelete } from "../../hooks/use-avatar-delete";
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

  const fullName = `${firstName} ${lastName}`;

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];

    if (newImage) await uploadAvatar(newImage);
  };

  const handleDeleteAvatar = async () => {
    await deleteAvatar();
  };

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
        {!isMobileOrTablet && (
          <>
            <label htmlFor="icon-button-file">
              <StyledIconButton>
                {uploading ? <CircularProgress size={24} /> : <CameraAltIcon />}
              </StyledIconButton>
            </label>
            {avatar && (
              <StyledIconButtonDelete onClick={handleDeleteAvatar}>
                {deleting ? <CircularProgress size={24} /> : <DeleteIcon />}
              </StyledIconButtonDelete>
            )}
          </>
        )}
      </StyledIconBox>

      {isMobileOrTablet && edit && (
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
      )}
    </Stack>
  );
};

export default AvatarUpload;
