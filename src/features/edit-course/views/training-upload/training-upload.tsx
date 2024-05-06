import { ChangeEvent, FC } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import { Box, CircularProgress, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import useResponsive from "shared/hooks/use-responsive";
import { useParams } from "react-router-dom";

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

const TrainingUpload: FC<ITrainingUpload> = ({ edit, picture }) => {
  const { trainingId } = useParams();
  const { isMobileOrTablet } = useResponsive();

  const { deleteTraining, deleting } = useTrainingDelete();
  const { uploadTraining, uploading } = useTrainingUpload();

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];

    if (newImage) await uploadTraining(newImage, trainingId!);
  };

  const handleDeleteAvatar = async () => {
    await deleteTraining(trainingId!);
  };

  return (
    <Stack direction="row">
      <VisuallyHiddenInput
        id="icon-button-file"
        type="file"
        onChange={handleImageChange}
      />
      <StyledIconBox>
        {picture ? (
          <img width="200px" src={`data:image/png;base64, ${picture}`} />
        ) : (
          <Box
            sx={{ width: "100px", height: "100px", backgroundColor: "red" }}
          ></Box>
        )}
        {!isMobileOrTablet && (
          <>
            <label htmlFor="icon-button-file">
              <StyledIconButton>
                {uploading ? <CircularProgress size={24} /> : <CameraAltIcon />}
              </StyledIconButton>
            </label>
            {picture && (
              <StyledIconButtonDelete onClick={handleDeleteAvatar}>
                {deleting ? <CircularProgress size={24} /> : <DeleteIcon />}
              </StyledIconButtonDelete>
            )}
          </>
        )}
      </StyledIconBox>

      {isMobileOrTablet && edit && (
        <StyledAvatarButtonStack>
          {picture && (
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
