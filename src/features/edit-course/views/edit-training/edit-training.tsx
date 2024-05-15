import { Box, Container, Typography } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputText } from "shared/components/form";
import { UserRole } from "api/graphql/generated/graphql";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { client } from "api";
import { Clear } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import TrainingUpload from "../training-upload";
import SelectMentors from "../../containers";
import {
  StyledButtonsStack,
  StyledCancelButton,
  StyledContinueButton,
  StyledSaveButton,
  StyledInfoStack,
  StyledPaper,
  StyledPaperStack,
  StyledSubmitButtonsStack,
  StyledWrapper,
} from "./edit-training.styled";
import { IEditTraining, TrainingInput } from "./edit-training.types";

const EditTraining: FC<IEditTraining> = ({ data, updateTraining }) => {
  const { trainingId } = useParams();
  const { picture, mentors, name, techStack } = data.training!;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();

  const { handleSubmit, control } = useForm<TrainingInput>({
    defaultValues: {
      id: trainingId,
      name,
      techStack,
      mentors,
    },
  });

  const onSubmit: SubmitHandler<TrainingInput> = async (data) => {
    const { mentors, ...restData } = data;
    const emails = mentors?.map((mentor) => mentor?.email);
    const submissionData = { ...restData, mentors: emails };

    await updateTraining({
      variables: { input: submissionData },
      onCompleted: () => {
        enqueueSnackbar("Курс обновлен", { variant: "success" });
        client.refetchQueries({ include: ["training"] });
      },
      onError: () => {
        enqueueSnackbar(
          "Не удалось обновить данные. Пожалуйста, попробуйте снова",
          { variant: "error" }
        );
      },
    });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledPaperStack>
          <Typography variant="h2">Редактирование курса</Typography>
          <StyledPaper>
            <StyledWrapper>
              <TrainingUpload edit picture={picture} />
              <StyledInfoStack>
                <Typography variant="h3">Название курса</Typography>
                <InputText
                  control={control}
                  name="name"
                  placeholder="Введите название курса"
                />
              </StyledInfoStack>
            </StyledWrapper>
          </StyledPaper>
          <StyledPaper>
            <StyledInfoStack>
              <Typography variant="h3">Ведущие преподаватели</Typography>
              <SelectMentors
                name="mentors"
                control={control}
                role={UserRole.Mentor}
              />
            </StyledInfoStack>
          </StyledPaper>
        </StyledPaperStack>
        <StyledButtonsStack>
          <StyledSubmitButtonsStack>
            <StyledSaveButton type="submit" variant="contained">
              <SaveIcon fontSize="small" />
              Сохранить
            </StyledSaveButton>
            <StyledContinueButton
              type="submit"
              variant="contained"
              onClick={() => navigate(`${location.pathname}/edit-lectures`)}
            >
              Продолжить
              <ArrowForwardIosIcon sx={{ fontSize: "16px" }} />
            </StyledContinueButton>
          </StyledSubmitButtonsStack>
          <Box>
            <StyledCancelButton
              color="secondary"
              variant="contained"
              onClick={() => navigate("/admin-panel/courses")}
            >
              <Clear fontSize="small" />
              Отмена
            </StyledCancelButton>
          </Box>
        </StyledButtonsStack>
      </form>
    </Container>
  );
};

export default EditTraining;
