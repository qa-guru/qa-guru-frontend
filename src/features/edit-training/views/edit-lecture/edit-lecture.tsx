import { Box, Button, Container, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Clear, Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { InputText } from "shared/components/form";
import { Editor } from "shared/components/text-editor";
import { RichTextEditorRef } from "shared/lib/mui-tiptap";
import { UserRole } from "api/graphql/generated/graphql";

import { SelectLectors } from "../../containers";
import {
  StyledButtonsStack,
  StyledContinueButton,
  StyledInfoStack,
  StyledPaper,
  StyledPaperStack,
  StyledSaveButton,
  StyledSubmitButtonsStack,
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

  const [description, setDescription] = useState(
    dataLecture?.lecture?.description!
  );
  const rteRefContent = useRef<RichTextEditorRef>(null);
  const rteRefContentHomeWork = useRef<RichTextEditorRef>(null);

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
      content: rteRefContent.current?.editor?.getHTML(),
      contentHomeWork: rteRefContentHomeWork.current?.editor?.getHTML(),
    };

    await updateLecture({
      variables: {
        input: submissionData,
      },
      onCompleted: () => {
        enqueueSnackbar("Урок обновлен", { variant: "success" });
        // client.refetchQueries({ include: ["lecture"] });
      },
      onError: () => {
        enqueueSnackbar(
          "Не удалось обновить данные. Пожалуйста, попробуйте снова",
          { variant: "error" }
        );
      },
    });
  };

  const handleBack = () => {
    const newPathname = location.pathname.replace(`/${id}`, "");
    navigate(newPathname);
  };

  const handleComplete = () => {
    handleSubmit(async (data) => {
      await onSubmit(data);
      navigate("/");
    })();
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
              <Editor content={content} rteRef={rteRefContent} />
            </StyledInfoStack>
          </StyledPaper>
          <StyledPaper>
            <StyledInfoStack>
              <Typography variant="h3">Домашнее задание</Typography>
              <Editor
                content={contentHomework}
                rteRef={rteRefContentHomeWork}
              />
            </StyledInfoStack>
          </StyledPaper>
        </StyledPaperStack>
        <StyledButtonsStack>
          <Box>
            <Button
              variant="contained"
              onClick={handleBack}
              color="secondary"
              endIcon={<Clear />}
            >
              Отменить
            </Button>
          </Box>
          <StyledSubmitButtonsStack>
            <StyledSaveButton
              type="submit"
              variant="contained"
              startIcon={<Save />}
            >
              Сохранить
            </StyledSaveButton>
            <StyledContinueButton onClick={handleComplete} variant="contained">
              Завершить
            </StyledContinueButton>
          </StyledSubmitButtonsStack>
        </StyledButtonsStack>
      </form>
    </Container>
  );
};

export default EditLecture;
