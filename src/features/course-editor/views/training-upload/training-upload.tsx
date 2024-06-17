import { ChangeEvent, FC } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";
import { CircularProgress, Stack } from "@mui/material";
import { useResponsive } from "shared/hooks";
import { useParams } from "react-router-dom";

import { useTrainingUpload } from "../../hooks/use-training-upload";
import { useTrainingDelete } from "../../hooks/use-training-delete";
import { ITrainingUpload } from "./training-upload.types";
import {
  StyledAvatarButtonStack,
  StyledIconBox,
  StyledIconButton,
  StyledIconButtonDelete,
  StyledImageBox,
  StyledLoadingButton,
  StyledLogoBox,
  StyledLogoWhite,
  VisuallyHiddenInput,
} from "./training-upload.styled";

const TrainingUpload: FC<ITrainingUpload> = ({ edit, picture }) => {
  const { trainingId } = useParams();
  const { isMobileOrTablet } = useResponsive();

  const { deleteTraining, deleting } = useTrainingDelete();
  const { uploadTraining, uploading } = useTrainingUpload();

  const avatarBox = (
    <StyledImageBox component="img" src={`data:image/png;base64, ${picture}`} />
  );
  const logoBox = (
    <StyledLogoBox>
      <StyledLogoWhite />
    </StyledLogoBox>
  );

  const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const newImage = e.target.files?.[0];

    if (newImage) await uploadTraining(newImage, trainingId!);
  };

  const handleDeleteAvatar = async () => {
    await deleteTraining(trainingId!);
  };

  const renderDesktop = () =>
    !isMobileOrTablet && (
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
    );

  const renderMobile = () =>
    isMobileOrTablet &&
    edit && (
      <StyledAvatarButtonStack>
        {picture && (
          <StyledLoadingButton
            variant="contained"
            loading={deleting}
            startIcon={<DeleteIcon fontSize="small" />}
            onClick={handleDeleteAvatar}
          >
            Удалить фото
          </StyledLoadingButton>
        )}
        <label htmlFor="icon-button-file">
          <StyledLoadingButton
            variant="contained"
            component="span"
            loading={uploading}
            startIcon={<ImageIcon fontSize="small" />}
          >
            Загрузить фото
          </StyledLoadingButton>
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
        {picture ? avatarBox : logoBox}
        {renderDesktop()}
      </StyledIconBox>

      {renderMobile()}
    </Stack>
  );
};

export default TrainingUpload;
