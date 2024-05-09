import { Container, Typography } from "@mui/material";
import { client } from "api";
import { UserRole } from "api/graphql/generated/graphql";
import { useSnackbar } from "notistack";
import { FC, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputText } from "shared/components/form";
import { Editor } from "shared/components/text-editor";
import { RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Add, Clear } from "@mui/icons-material";
import { useLocation, useNavigate } from "react-router-dom";

import SelectLectors from "../../containers";
import {
  StyledButtonsStack,
  StyledCancelButton,
  StyledContinueButton,
  StyledInfoStack,
  StyledPaper,
  StyledPaperStack,
} from "./edit-lecture.styled";
import { IEditLecture, LectureInput } from "./edit-lecture.types";
import EditDescription from "../edit-description";

const EditLecture: FC<IEditLecture> = ({
  dataLecture,
  updateLecture,
  dataLectureHomework,
}) => {
  const { id, subject, speakers, content } = dataLecture.lecture!;
  const contentHomework = dataLectureHomework.lectureHomeWork;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const location = useLocation();

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
        navigate(-1);
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
          <Typography variant="h2">Редактирование урока</Typography>
          <StyledPaper>
            <StyledInfoStack>
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
            </StyledInfoStack>
          </StyledPaper>
          <StyledPaper>
            <StyledInfoStack>
              <Typography variant="h3">Преподаватели</Typography>
              <SelectLectors
                name="speakers"
                control={control}
                role={UserRole.Lector}
              />
            </StyledInfoStack>
          </StyledPaper>
          <StyledPaper>
            <StyledInfoStack>
              <Typography variant="h3">Материалы урока</Typography>
              <Editor content={aggregatedContent} rteRef={rteRefContent} />
            </StyledInfoStack>
          </StyledPaper>
          <StyledPaper>
            <StyledInfoStack>
              <Typography variant="h3">Домашнее задание</Typography>
              <Editor
                content={aggregatedContentHomework}
                rteRef={rteRefСontentHomeWork}
              />
            </StyledInfoStack>
          </StyledPaper>
        </StyledPaperStack>
        <StyledButtonsStack>
          <StyledCancelButton
            variant="contained"
            onClick={() => navigate(-1)}
            color="secondary"
          >
            <Clear fontSize="small" />
            Отменить
          </StyledCancelButton>
          <StyledContinueButton type="submit" variant="contained">
            <Add fontSize="small" />
            Сохранить
          </StyledContinueButton>
        </StyledButtonsStack>
      </form>
    </Container>
  );
};

export default EditLecture;
