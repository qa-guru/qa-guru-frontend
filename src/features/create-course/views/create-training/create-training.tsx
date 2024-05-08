import { Container, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "shared/components/form";

import TrainingUpload from "../training-upload";
import {
  StyledInfoStack,
  StyledPaper,
  StyledPaperStack,
} from "./create-training.styled";

const CreateTraining: FC = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: { id: "", name: "" },
  });

  return (
    <Container>
      <StyledPaperStack>
        <Typography variant="h2">Новый курс</Typography>
        <StyledPaper>
          <StyledInfoStack>
            <TrainingUpload />
            <Typography variant="h3">Название курса</Typography>
            <InputText
              control={control}
              name="name"
              placeholder="Введите название курса"
            />
          </StyledInfoStack>
        </StyledPaper>
      </StyledPaperStack>
    </Container>
  );
};

export default CreateTraining;
