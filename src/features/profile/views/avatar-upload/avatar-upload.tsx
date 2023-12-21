import React, { ChangeEvent, FC, useRef, useState } from "react";
import AvatarEditor from "react-avatar-editor";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { IAvatarUpload } from "./avatar-upload.types";
import {
  StyledButton,
  StyledButtonsStack,
  StyledDialogContent,
  StyledIconBox,
  StyledIconButton,
  StyledPaper,
  StyledPersonIcon,
  StyledSlider,
  VisuallyHiddenInput,
} from "./avatar-upload.styled";
import { useAvatarUpload } from "../../hooks/use-avatar-upload";

const AvatarUpload: FC<IAvatarUpload> = () => {
  const { uploadAvatar, uploading } = useAvatarUpload();
  const [image, setImage] = useState<string>("");
  const [scale, setScale] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [fileType, setFileType] = useState<string>("");
  const editorRef = useRef<AvatarEditor>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const originalFile = e.target.files[0];
      const fileType = originalFile.type;

      const fileReader = new FileReader();
      fileReader.onload = function (e) {
        setImage(e.target?.result as string);
        setOpen(true);
      };
      fileReader.readAsDataURL(e.target.files[0]);
      setFileType(fileType);
    }
  };
  const handleScaleChange = (event: Event, newValue: number | number[]) => {
    setScale(newValue as number);
  };

  const handleSave = async () => {
    if (editorRef.current && !uploading) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve)
      );
      if (blob) {
        const file = new File([blob], "avatar", { type: fileType });
        await uploadAvatar(file);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledPaper>
      <StyledIconBox>
        <StyledPersonIcon />
        <StyledIconButton>
          <label>
            <CameraAltIcon />
            <VisuallyHiddenInput type="file" onChange={handleImageChange} />
          </label>
        </StyledIconButton>
      </StyledIconBox>
      <Dialog open={open} onClose={handleClose}>
        <StyledDialogContent>
          {image && (
            <AvatarEditor
              ref={editorRef}
              image={image}
              border={50}
              borderRadius={12}
              color={[255, 255, 255, 0.6]}
              scale={scale}
              rotate={0}
            />
          )}
          <StyledSlider
            value={scale}
            min={1}
            max={2}
            step={0.01}
            onChange={handleScaleChange}
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
    </StyledPaper>
  );
};

export default AvatarUpload;
