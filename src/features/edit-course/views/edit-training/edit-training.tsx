import { Box, Container, Typography } from "@mui/material";
import { FC, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputText } from "shared/components/form";
import { UserRole } from "api/graphql/generated/graphql";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { client } from "api";
import { Add, Clear } from "@mui/icons-material";

import TrainingUpload from "../training-upload";
import SelectMentors from "../../containers";
import {
  StyledButtonsStack,
  StyledCancelButton,
  StyledContinueButton,
  StyledCoursesButton,
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
  const [redirectPath, setRedirectPath] = useState<string | null>(null);

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

        if (redirectPath) {
          navigate(redirectPath);
        }
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
            <StyledCoursesButton
              type="submit"
              variant="contained"
              onClick={() => setRedirectPath("/admin-panel/courses")}
            >
              <Clear fontSize="small" />
              Сохранить и закрыть
            </StyledCoursesButton>
            <StyledContinueButton
              type="submit"
              variant="contained"
              onClick={() =>
                setRedirectPath(`${location.pathname}/edit-lectures`)
              }
            >
              <Add fontSize="small" />
              Сохранить и продолжить
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
