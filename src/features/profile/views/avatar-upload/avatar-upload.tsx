import { ChangeEvent, FC } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AvatarCustom from "shared/components/avatar-custom";
import { CircularProgress } from "@mui/material";

import { useAvatarUpload } from "../../hooks/use-avatar-upload";
import { IAvatarUpload } from "./avatar-upload.types";
import {
  StyledIconBox,
  StyledIconButton,
  VisuallyHiddenInput,
} from "./avatar-upload.styled";

const AvatarUpload: FC<IAvatarUpload> = ({ user }) => {
  const { uploadAvatar, uploading } = useAvatarUpload();

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];

    if (newImage) await uploadAvatar(newImage);
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
          width={250}
          height={250}
        />
        <label htmlFor="icon-button-file">
          <StyledIconButton>
            {uploading ? <CircularProgress size={24} /> : <CameraAltIcon />}
          </StyledIconButton>
        </label>
      </StyledIconBox>
    </>
  );
};

export default AvatarUpload;
