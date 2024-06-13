import { ChangeEvent, FC } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import AvatarCustom from "shared/components/avatar-custom";
import { CircularProgress, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { useUserIdQuery } from "api/graphql/generated/graphql";
import { useAvatarDelete, useAvatarUpload, useResponsive } from "shared/hooks";

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

  const { data: dataUserId } = useUserIdQuery({ fetchPolicy: "cache-first" });

  const fullName = `${firstName} ${lastName}`;
  const isCurrentUser = user?.id === dataUserId?.user?.id;

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
              {isCurrentUser && (
                <StyledIconButton>
                  {uploading ? (
                    <CircularProgress size={24} />
                  ) : (
                    <CameraAltIcon />
                  )}
                </StyledIconButton>
              )}
            </label>
            {isCurrentUser && avatar && (
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
