import { Container, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { InputText } from "shared/components/form";

import TrainingUpload from "../training-upload";

const EditTraining: FC = () => {
  const { handleSubmit, control } = useForm({
    defaultValues: { id: "", name: "" },
  });

  return (
    <Container>
      <Typography variant="h2">Новый курс</Typography>
      <Paper>
        <TrainingUpload />
        <Typography variant="h3">Название курса</Typography>
        <InputText
          control={control}
          name="name"
          placeholder="Введите название курса"
        />
      </Paper>
    </Container>
  );
};

export default EditTraining;
