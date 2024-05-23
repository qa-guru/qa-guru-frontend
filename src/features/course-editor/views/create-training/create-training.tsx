import { Box, Container, Typography } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputText } from "shared/components/form";
import { TechStack, UserRole } from "api/graphql/generated/graphql";
import { useLocation, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { client } from "api";
import { Clear } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";

import TrainingUpload from "../training-upload";
import SelectMentors from "../../containers";
import {
  StyledButtonsStack,
  StyledCancelButton,
  StyledSaveButton,
  StyledInfoStack,
  StyledPaper,
  StyledPaperStack,
  StyledWrapper,
} from "./create-training.styled";
import { ICreateTraining, TrainingInput } from "./create-training.types";

const CreateTraining: FC<ICreateTraining> = ({ updateTraining }) => {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();

  const { handleSubmit, control } = useForm<TrainingInput>({
    defaultValues: {
      name: "",
      techStack: TechStack.Python,
    },
  });

  const onSubmit: SubmitHandler<TrainingInput> = async (data) => {
    const { mentors, ...restData } = data;
    const emails = mentors?.map((mentor) => mentor?.email);
    const submissionData = { ...restData, mentors: emails };

    await updateTraining({
      variables: { input: submissionData },
      onCompleted: (response) => {
        enqueueSnackbar("Курс создан", { variant: "success" });
        client.refetchQueries({ include: ["training"] });
        navigate(
          `${location.pathname}/${response.updateTraining?.id}/create-lectures`
        );
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
          <Typography variant="h2">Создание курса</Typography>
          <StyledPaper>
            <StyledWrapper>
              <TrainingUpload edit />
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
                role={UserRole.Lector}
              />
            </StyledInfoStack>
          </StyledPaper>
        </StyledPaperStack>
        <StyledButtonsStack>
          <StyledSaveButton type="submit" variant="contained">
            <SaveIcon fontSize="small" />
            Создать курс и продолжить
          </StyledSaveButton>
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

export default CreateTraining;
