import { ChangeEvent, FC, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useModal } from "react-modal-hook";

import { IAvatarUpload } from "./avatar-upload.types";
import {
  StyledButton,
  StyledButtonsStack,
  StyledDialogContent,
  StyledIconBox,
  StyledIconButton,
  StyledPersonIcon,
  StyledSlider,
  VisuallyHiddenInput,
} from "./avatar-upload.styled";
import { useAvatarUpload } from "../../hooks/use-avatar-upload";

const AvatarUpload: FC<IAvatarUpload> = () => {
  const { uploadAvatar, uploading } = useAvatarUpload();
  const [scale, setScale] = useState<number>(1);
  const editorRef = useRef<AvatarEditor>(null);

  const [showModal, hideModal] = useModal(({ in: open }) => (
    <Dialog open={open} onClose={hideModal}>
      <StyledDialogContent>
        <AvatarEditor
          ref={editorRef}
          image="http://example.com/initialimage.jpg"
          scale={scale}
          rotate={0}
          border={50}
          borderRadius={12}
          color={[255, 255, 255, 0.6]}
        />
        <StyledSlider
          value={scale}
          onChange={handleScaleChange}
          min={1}
          max={2}
          step={0.01}
        />
        <StyledButtonsStack>
          <Button variant="contained" color="secondary" onClick={handleClose}>
            Отмена
          </Button>
          <StyledButton variant="contained" onClick={handleSave}>
            Сохранить
          </StyledButton>
        </StyledButtonsStack>
      </StyledDialogContent>
    </Dialog>
  ));

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {};

  const handleScaleChange = (_: Event, newValue: number | number[]) => {
    setScale(newValue as number);
  };

  const handleSave = async () => {};

  const handleClose = () => {};

  return (
    <StyledIconBox>
      <StyledPersonIcon />
      <StyledIconButton>
        <label>
          <CameraAltIcon />
          <VisuallyHiddenInput type="file" onChange={handleImageChange} />
        </label>
      </StyledIconButton>
    </StyledIconBox>
  );
};

export default AvatarUpload;
