import { Container, Stack, Typography } from "@mui/material";
import { FC } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useNavigate } from "react-router-dom";
import { TrainingPictureQuery } from "api/graphql/generated/graphql";

import TrainingUpload from "../training-upload";
import {
  StyledButtonsStack,
  StyledPaper,
  StyledSaveButton,
} from "./create-training-upload.styled";

interface ICreateTrainingUpload {
  data: TrainingPictureQuery;
}

const CreateTrainingUpload: FC<ICreateTrainingUpload> = ({ data }) => {
  const navigate = useNavigate();

  const handleNavigateToCreateLectures = () => {
    navigate(`${location.pathname}/create-lectures`);
  };

  return (
    <Container>
      <StyledPaper>
        <Stack spacing={2}>
          <Typography variant="h2">Загрузите изображение</Typography>
          <TrainingUpload edit picture={data?.training?.picture} />
        </Stack>
      </StyledPaper>
      <StyledButtonsStack>
        <StyledSaveButton
          type="submit"
          variant="contained"
          onClick={handleNavigateToCreateLectures}
        >
          Продолжить
          <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
        </StyledSaveButton>
      </StyledButtonsStack>
    </Container>
  );
};

export default CreateTrainingUpload;
