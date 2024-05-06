import {
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { client } from "api";
import {
  InputMaybe,
  LectureContentHomeWorkInput,
  LectureContentInput,
  LectureHomeWorkQuery,
  LectureQuery,
  Scalars,
  UpdateLectureMutationFn,
} from "api/graphql/generated/graphql";
import { useSnackbar } from "notistack";
import { Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputText } from "shared/components/form";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Editor } from "shared/components/text-editor";
import { RichTextEditorRef } from "shared/lib/mui-tiptap";

import { SelectMentors } from "../../containers";

interface IEditLecture {
  updateLecture: UpdateLectureMutationFn;
  dataLectureHomework: LectureHomeWorkQuery;
  dataLecture: LectureQuery;
}

type LectureInput = {
  content?: InputMaybe<Array<InputMaybe<LectureContentInput>>>;
  contentHomeWork?: InputMaybe<Array<InputMaybe<LectureContentHomeWorkInput>>>;
  description?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  homeWorkLevelCode?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  speakers?: InputMaybe<Array<InputMaybe<any>>>;
  subject?: InputMaybe<Scalars["String"]>;
};

export const StyledTypography = styled(Typography)(({ theme }) => ({
  minWidth: "40px",
  height: "40px",
  backgroundColor: theme.palette.app.primary,
  borderRadius: "50%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  color: theme.palette.app.white,
}));

const EditLecture: FC<IEditLecture> = ({
  dataLecture,
  updateLecture,
  dataLectureHomework,
}) => {
  const { id, subject, speakers, content } = dataLecture.lecture!;
  const contentHomework = dataLectureHomework.lectureHomeWork;
  const { enqueueSnackbar } = useSnackbar();
  const [description, setDescription] = useState(
    dataLecture?.lecture?.description!
  );
  const rteRefContent = useRef<RichTextEditorRef>(null);
  const rteRefСontentHomeWork = useRef<RichTextEditorRef>(null);

  const aggregatedContentHomework = contentHomework
    ?.map((item) => item?.value)
    .filter(Boolean)
    .join("\n\n");

  const aggregatedContent = content
    ?.map((item) => item?.value)
    .filter(Boolean)
    .join("\n\n");

  const { handleSubmit, control } = useForm({
    defaultValues: { id, subject, description, speakers },
  });

  const onSubmit: SubmitHandler<LectureInput> = async (data) => {
    const { speakers, ...restData } = data;

    const emails = speakers?.map((speaker) => speaker?.email);

    const submissionData = {
      ...restData,
      speakers: emails,
      description,
      content: [
        {
          value: rteRefContent.current?.editor?.getHTML() ?? "",
          type: "text",
        },
      ],
      contentHomeWork: [
        {
          value: rteRefСontentHomeWork.current?.editor?.getHTML() ?? "",
          type: "text",
        },
      ],
    };

    await updateLecture({
      variables: {
        input: submissionData,
      },
      onCompleted: () => {
        enqueueSnackbar("Урок обновлен", { variant: "success" });
        client.refetchQueries({ include: ["lecture"] });
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
        <Typography variant="h2">Редактирование урока</Typography>
        <Paper>
          <Typography variant="h3">Название урока</Typography>
          <InputText
            control={control}
            name="subject"
            placeholder="Введите название урока"
          />
          <EditDescription
            description={description}
            setDescription={setDescription}
          />
        </Paper>
        <Paper>
          <Typography variant="h3">Преподаватели</Typography>
          <SelectMentors name="speakers" control={control} />
        </Paper>
        <Paper>
          <Typography variant="h3">Материалы урока</Typography>
          <Editor content={aggregatedContent} rteRef={rteRefContent} />
        </Paper>
        <Paper>
          <Typography variant="h3">Домашнее задание</Typography>
          <Editor
            content={aggregatedContentHomework}
            rteRef={rteRefСontentHomeWork}
          />
        </Paper>
        <Button type="submit" variant="contained">
          Сохранить
        </Button>
      </form>
    </Container>
  );
};

export default EditLecture;

interface IEditDescription {
  description: (string | null)[];
  setDescription: Dispatch<SetStateAction<(string | null)[]>>;
}

const EditDescription: FC<IEditDescription> = ({
  description,
  setDescription,
}) => {
  const handleAddDescription = () => {
    setDescription([...description, ""]);
  };

  const handleDescriptionChange = (index: number, value: string | null) => {
    const newDescription = [...description];
    newDescription[index] = value;
    setDescription(newDescription);
  };

  const handleRemoveDescription = (index: number) => {
    const newDescription = [...description];
    newDescription.splice(index, 1);
    setDescription(newDescription);
  };

  return (
    <>
      <Typography variant="h3">Содержание урока</Typography>
      {description.map((desc, index) => (
        <Stack key={index} direction="row" alignItems="center">
          <StyledTypography variant="subtitle2">{index + 1}</StyledTypography>
          <TextField
            multiline
            value={desc}
            onChange={(e) => handleDescriptionChange(index, e.target.value)}
            placeholder="Введите содержание урока"
          />
          <IconButton onClick={() => handleRemoveDescription(index)}>
            <RemoveIcon color="primary" />
          </IconButton>
        </Stack>
      ))}
      <IconButton onClick={handleAddDescription}>
        <AddIcon color="primary" />
      </IconButton>
    </>
  );
};
