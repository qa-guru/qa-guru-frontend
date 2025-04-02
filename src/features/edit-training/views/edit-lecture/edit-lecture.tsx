import { Box, Button, Container, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Clear, Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { LECTURE_FILE_GET_URI, LECTURE_HOMEWORK_FILE_GET_URI } from "config";

import { InputText } from "shared/components/form";
import { Editor } from "shared/components/text-editor";
import { RichTextEditorRef } from "shared/lib/mui-tiptap";
import { UserRole } from "api/graphql/generated/graphql";
import { PendingFile } from "shared/components/text-editor/types";
import { createUrlWithParams } from "shared/utils";
import {
  useLectureFileDelete,
  useLectureFileUpload,
  useLectureHomeworkFileDelete,
  useLectureHomeworkFileUpload,
} from "shared/hooks";

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
import { extractFileId } from "shared/helpers";

const EditLecture: FC<IEditLecture> = ({
  dataLecture,
  updateLecture,
  dataLectureHomework,
}) => {
  const { id: lectureId, subject, speakers, content } = dataLecture.lecture!;
  const contentHomework = dataLectureHomework.lectureHomeWork;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const { uploadLectureFile } = useLectureFileUpload();
  const { uploadLectureHomeworkFile } = useLectureHomeworkFileUpload();
  const { deleteLectureFile } = useLectureFileDelete();
  const { deleteLectureHomeworkFile } = useLectureHomeworkFileDelete();

  const [description, setDescription] = useState(
    dataLecture?.lecture?.description!
  );
  const rteRefContent = useRef<RichTextEditorRef>(null);
  const rteRefContentHomeWork = useRef<RichTextEditorRef>(null);

  const { handleSubmit, control } = useForm({
    defaultValues: { id: lectureId, subject, description, speakers },
  });

  const onSubmit: SubmitHandler<LectureInput> = async (data) => {
    const { speakers, ...restData } = data;

    const emails = speakers?.map((speaker) => speaker?.email);

    let content = rteRefContent.current?.editor?.getHTML().trim();
    let contentHomework = rteRefContentHomeWork.current?.editor
      ?.getHTML()
      .trim();

    if (!lectureId) {
      return;
    }

    const lectureFiles = pendingFiles.filter(
      (file) => file.source === "lecture"
    );
    const homeworkFiles = pendingFiles.filter(
      (file) => file.source === "lectureHomework"
    );

    const lectureUploadPromises = lectureFiles.map(
      async ({ file, localUrl }) => {
        const uploadedFile = await uploadLectureFile(file, lectureId);
        return {
          localUrl,
          realUrl: createUrlWithParams(LECTURE_FILE_GET_URI, {
            lectureId,
            fileId: uploadedFile?.id!,
          }),
        };
      }
    );

    const lectureHomeworkUploadPromises = homeworkFiles.map(
      async ({ file, localUrl }) => {
        const uploadedFile = await uploadLectureHomeworkFile(file, lectureId);
        return {
          localUrl,
          realUrl: createUrlWithParams(LECTURE_HOMEWORK_FILE_GET_URI, {
            lectureId,
            fileId: uploadedFile?.id!,
          }),
        };
      }
    );

    const uploadedLectureFiles = await Promise.all(lectureUploadPromises);
    const uploadedLectureHomeworkFiles = await Promise.all(
      lectureHomeworkUploadPromises
    );

    uploadedLectureFiles.forEach(({ localUrl, realUrl }) => {
      content = content?.replaceAll(localUrl, realUrl);
    });

    uploadedLectureHomeworkFiles.forEach(({ localUrl, realUrl }) => {
      contentHomework = contentHomework?.replaceAll(localUrl, realUrl);
    });

    const submissionData = {
      ...restData,
      speakers: emails,
      description,
      content,
      contentHomeWork: contentHomework,
    };

    await updateLecture({
      variables: {
        input: submissionData,
      },
      onCompleted: () => {
        enqueueSnackbar("Урок обновлен", { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar(
          "Не удалось обновить данные. Пожалуйста, попробуйте снова",
          { variant: "error" }
        );
      },
    });

    setPendingFiles([]);
    rteRefContent.current?.editor?.commands.clearContent();
    rteRefContentHomeWork.current?.editor?.commands.clearContent();
  };

  const handleBack = () => {
    const newPathname = location.pathname.replace(`/${lectureId}`, "");
    navigate(newPathname);
  };

  const handleComplete = () => {
    handleSubmit(async (data) => {
      await onSubmit(data);
      navigate("/");
    })();
  };

  const handleDeleteLectureFiles = async (content: string) => {
    const fileIds = extractFileId(content);

    for (const fileId of fileIds) {
      if (lectureId) {
        await deleteLectureFile(lectureId, fileId);
      }
    }
  };

  const handleDeleteHomeworkFiles = async (content: string) => {
    const fileIds = extractFileId(content);

    for (const fileId of fileIds) {
      if (lectureId) {
        await deleteLectureHomeworkFile(lectureId, fileId);
      }
    }
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
              <Editor
                content={content}
                rteRef={rteRefContent}
                setPendingFiles={setPendingFiles}
                source="lecture"
                handleDeleteFile={handleDeleteLectureFiles}
              />
            </StyledInfoStack>
          </StyledPaper>
          <StyledPaper>
            <StyledInfoStack>
              <Typography variant="h3">Домашнее задание</Typography>
              <Editor
                content={contentHomework}
                rteRef={rteRefContentHomeWork}
                setPendingFiles={setPendingFiles}
                source="lectureHomework"
                handleDeleteFile={handleDeleteHomeworkFiles}
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
