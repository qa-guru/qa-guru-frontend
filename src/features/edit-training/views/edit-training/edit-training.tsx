import { Box, Button, Container, Typography } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { client } from "api";
import { Clear } from "@mui/icons-material";
import SaveIcon from "@mui/icons-material/Save";

import { UserRole } from "api/graphql/generated/graphql";
import { InputText } from "shared/components/form";

import TrainingUpload from "../training-upload";
import { SelectLectors } from "../../containers";
import {
  StyledArrowForwardIosIcon,
  StyledButtonsStack,
  StyledContinueButton,
  StyledInfoStack,
  StyledPaper,
  StyledPaperStack,
  StyledSaveButton,
  StyledSubmitButtonsStack,
  StyledWrapper,
} from "./edit-training.styled";
import { IEditTraining, TrainingInput } from "./edit-training.types";

const EditTraining: FC<IEditTraining> = ({ data, updateTraining }) => {
  const { trainingId } = useParams();
  const { picture, mentors, name, techStack } = data?.training! || {};
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

  const handleContinue = () => {
    handleSubmit(async (data) => {
      await onSubmit(data);
      navigate(`${location.pathname}/edit-lectures`);
    })();
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
              <SelectLectors
                name="mentors"
                control={control}
                role={UserRole.Lector}
              />
            </StyledInfoStack>
          </StyledPaper>
        </StyledPaperStack>
        <StyledButtonsStack>
          <Box>
            <Button
              color="secondary"
              variant="contained"
              onClick={() => navigate("/")}
              endIcon={<Clear fontSize="small" />}
            >
              Отменить
            </Button>
          </Box>
          <StyledSubmitButtonsStack>
            <StyledSaveButton
              type="submit"
              variant="contained"
              startIcon={<SaveIcon />}
            >
              Сохранить
            </StyledSaveButton>
            <StyledContinueButton variant="contained" onClick={handleContinue}>
              Продолжить
              <StyledArrowForwardIosIcon />
            </StyledContinueButton>
          </StyledSubmitButtonsStack>
        </StyledButtonsStack>
      </form>
    </Container>
  );
};

export default EditTraining;
