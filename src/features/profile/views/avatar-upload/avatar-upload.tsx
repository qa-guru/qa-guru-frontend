import { ChangeEvent, FC, useRef, useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AvatarCustom from "shared/components/avatar-custom";

import { useAvatarUpload } from "../../hooks/use-avatar-upload";
import { IAvatarUpload } from "./avatar-upload.types";
import {
  StyledIconBox,
  StyledIconButton,
  VisuallyHiddenInput,
} from "./avatar-upload.styled";

const AvatarUpload: FC<IAvatarUpload> = ({ user }) => {
  const { uploadAvatar, uploading } = useAvatarUpload();
  const [image, setImage] = useState<string | null>(
    `data:image/jpeg;base64,${user}`
  );
  const inputFileRef = useRef<HTMLInputElement>(null);

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const cleanup = () => {
    if (image) {
      URL.revokeObjectURL(image);
      setImage(null);
    }
    if (inputFileRef.current) {
      inputFileRef.current.value = "";
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];

    if (newImage) {
      setImage(URL.createObjectURL(newImage));
    }
  };

  return (
    <>
      <VisuallyHiddenInput
        ref={inputFileRef}
        id="icon-button-file"
        type="file"
        onChange={handleImageChange}
      />
      <StyledIconBox>
        <AvatarCustom
          img={`data:image/jpeg;base64,${user?.avatar}`}
          fullName={fullName}
          width={250}
          height={250}
        />
        <label htmlFor="icon-button-file">
          <StyledIconButton>
            <CameraAltIcon />
          </StyledIconButton>
        </label>
      </StyledIconBox>
    </>
  );
};

export default AvatarUpload;
