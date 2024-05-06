import { Button, Container, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputText } from "shared/components/form";
import {
  InputMaybe,
  Scalars,
  TechStack,
  TrainingQuery,
  UpdateTrainingMutationFn,
} from "api/graphql/generated/graphql";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { client } from "api";

import TrainingUpload from "../training-upload";
import { SelectMentors } from "../../containers";

interface IEditTraining {
  data: TrainingQuery;
  updateTraining: UpdateTrainingMutationFn;
}

type TrainingInput = {
  content?: InputMaybe<Scalars["String"]>;
  description?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mentors?: InputMaybe<Array<InputMaybe<any>>>;
  name?: InputMaybe<Scalars["String"]>;
  techStack: TechStack;
};

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

    const submissionData = {
      ...restData,
      mentors: emails,
    };

    await updateTraining({
      variables: {
        input: submissionData,
      },
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

  const handleNavigateTrainingLecture = () => {
    navigate(`${location.pathname}/edit-lectures`);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h2">Редактирование курса</Typography>
        <Paper>
          <TrainingUpload edit picture={picture} />
          <Typography variant="h3">Название курса</Typography>
          <InputText
            control={control}
            name="name"
            placeholder="Введите название курса"
          />
        </Paper>
        <Paper>
          <Typography variant="h3">Ведущие преподаватели</Typography>
          <SelectMentors name="mentors" control={control} />
        </Paper>
        <Button type="submit" variant="contained">
          Сохранить
        </Button>
        <Button onClick={handleNavigateTrainingLecture} variant="contained">
          Далее
        </Button>
      </form>
    </Container>
  );
};

export default EditTraining;
