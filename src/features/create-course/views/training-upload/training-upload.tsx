import { ChangeEvent, FC } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import { CircularProgress, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useResponsive from "shared/hooks/use-responsive";

import { useTrainingUpload } from "../../hooks/use-training-upload";
import { useTrainingDelete } from "../../hooks/use-training-delete";
import { ITrainingUpload } from "./training-upload.types";
import {
  StyledAvatarButtonStack,
  StyledIconBox,
  StyledIconButton,
  StyledIconButtonDelete,
  VisuallyHiddenInput,
} from "./training-upload.styled";

const TrainingUpload: FC<ITrainingUpload> = ({ edit }) => {
  const { isMobileOrTablet } = useResponsive();

  const id = "12314";

  const pictire = "sadf";

  const { deleteTraining, deleting } = useTrainingDelete();
  const { uploadTraining, uploading } = useTrainingUpload();

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];

    if (newImage) await uploadTraining(newImage, id);
  };

  const handleDeleteAvatar = async () => {
    await deleteTraining(id);
  };

  return (
    <Stack direction="row">
      <VisuallyHiddenInput
        id="icon-button-file"
        type="file"
        onChange={handleImageChange}
      />
      <StyledIconBox>
        <img src={`data:image/png;base64, ${pictire}`} />
        {!isMobileOrTablet && (
          <>
            <label htmlFor="icon-button-file">
              <StyledIconButton>
                {uploading ? <CircularProgress size={24} /> : <CameraAltIcon />}
              </StyledIconButton>
            </label>
            {pictire && (
              <StyledIconButtonDelete onClick={handleDeleteAvatar}>
                {deleting ? <CircularProgress size={24} /> : <DeleteIcon />}
              </StyledIconButtonDelete>
            )}
          </>
        )}
      </StyledIconBox>

      {isMobileOrTablet && edit && (
        <StyledAvatarButtonStack>
          {pictire && (
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

export default TrainingUpload;
