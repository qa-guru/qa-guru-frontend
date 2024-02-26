import { ChangeEvent, FC } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import AvatarCustom from "shared/components/avatar-custom";
import { CircularProgress } from "@mui/material";

import { useAvatarUpload } from "../../hooks/use-avatar-upload";
import { useAvatarDelete } from "../../hooks/use-avatar-delete";
import { IAvatarUpload } from "./avatar-upload.types";
import {
  StyledIconBox,
  StyledIconButtonDelete,
  StyledIconButton,
  VisuallyHiddenInput,
} from "./avatar-upload.styled";

const AvatarUpload: FC<IAvatarUpload> = ({ user, hideIcons }) => {
  const { uploadAvatar, uploading } = useAvatarUpload();
  const { deleteAvatar, deleting } = useAvatarDelete();

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];

    if (newImage) await uploadAvatar(newImage);
  };

  const handleDeleteAvatar = async () => {
    await deleteAvatar();
  };

  return (
    <>
      <VisuallyHiddenInput
        id="icon-button-file"
        type="file"
        onChange={handleImageChange}
      />
      <StyledIconBox>
        <AvatarCustom
          img={user?.avatar}
          fullName={fullName}
          width={{ xs: "100px", sm: "290px", md: "240px" }}
          height={{ xs: "100px", sm: "290px", md: "240px" }}
        />
        {!hideIcons && (
          <>
            <label htmlFor="icon-button-file">
              <StyledIconButton>
                {uploading ? <CircularProgress size={24} /> : <CameraAltIcon />}
              </StyledIconButton>
            </label>
            {user?.avatar && (
              <StyledIconButtonDelete onClick={handleDeleteAvatar}>
                {deleting ? <CircularProgress size={24} /> : <DeleteIcon />}
              </StyledIconButtonDelete>
            )}
          </>
        )}
      </StyledIconBox>
    </>
  );
};

export default AvatarUpload;
