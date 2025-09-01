import { Box, Button, Container, Typography } from "@mui/material";
import { useSnackbar } from "notistack";
import { FC, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Clear, Save } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { LECTURE_FILE_GET_URI, LECTURE_HOMEWORK_FILE_GET_URI } from "config";

import { InputText } from "shared/components/form";
import { Editor } from "shared/components/text-editor";
import {
  blobUrlToFile,
  collectFileIds,
  findNodeByUrl,
  RichTextEditorRef,
} from "shared/lib/mui-tiptap";
import { UserRole } from "api/graphql/generated/graphql";
import { PendingFile } from "shared/components/text-editor/types";
import { createUrlWithParams } from "shared/utils";
import {
  useLectureFileDelete,
  useLectureFileUpload,
  useLectureHomeworkFileDelete,
  useLectureHomeworkFileUpload,
} from "shared/hooks";

import { SelectLectors, SelectTests } from "../../containers";
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
  const {
    id: lectureId,
    subject,
    speakers,
    content,
    testGroup,
  } = dataLecture.lecture!;
  const contentHomework = dataLectureHomework.lectureHomeWork;
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [deletedLectureFileIds, setDeletedLectureFileIds] = useState<string[]>(
    []
  );
  const [deletedHomeworkFileIds, setDeletedHomeworkFileIds] = useState<
    string[]
  >([]);

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
    defaultValues: {
      id: lectureId,
      subject,
      description,
      speakers,
      testGroupId: testGroup?.id || "",
    },
  });

  const onSubmit: SubmitHandler<LectureInput> = async (data) => {
    const { speakers, ...restData } = data;
    const emails = speakers?.map((s) => s?.email);
    if (!lectureId) return;

    let content = rteRefContent.current?.editor?.getHTML().trim() || "";
    let contentHomework =
      rteRefContentHomeWork.current?.editor?.getHTML().trim() || "";

    const editorContent = rteRefContent.current?.editor!;
    const editorHomework = rteRefContentHomeWork.current?.editor!;

    const contentBlobUrls = Array.from(
      content.matchAll(/(blob:[^"'\s>]+)/g)
    ).map((m) => m[1]);
    const homeworkBlobUrls = Array.from(
      contentHomework.matchAll(/(blob:[^"'\s>]+)/g)
    ).map((m) => m[1]);

    const recoveredLecture = await Promise.all(
      contentBlobUrls
        .filter((url) => !pendingFiles.find((f) => f.localUrl === url))
        .map(async (url) => {
          const node = findNodeByUrl(editorContent.state.doc, url);
          const fileName = node?.fileName || "recovered_file";
          const file = await blobUrlToFile(url, fileName);
          return { file, localUrl: url, source: "lecture" as const };
        })
    );

    const recoveredHomework = await Promise.all(
      homeworkBlobUrls
        .filter((url) => !pendingFiles.find((f) => f.localUrl === url))
        .map(async (url) => {
          const node = findNodeByUrl(editorHomework.state.doc, url);
          const fileName = node?.fileName || "recovered_file";
          const file = await blobUrlToFile(url, fileName);
          return { file, localUrl: url, source: "lectureHomework" as const };
        })
    );

    const allFiles = [
      ...pendingFiles,
      ...recoveredLecture,
      ...recoveredHomework,
    ];
    const lectureFiles = allFiles.filter((f) => f.source === "lecture");
    const homeworkFiles = allFiles.filter(
      (f) => f.source === "lectureHomework"
    );

    const uploadedLectureFiles = await Promise.all(
      lectureFiles.map(async ({ file, localUrl }) => {
        const uploaded = await uploadLectureFile(file, lectureId);
        return {
          localUrl,
          realUrl: createUrlWithParams(LECTURE_FILE_GET_URI, {
            lectureId,
            fileId: uploaded?.id!,
          }),
        };
      })
    );

    const uploadedHomeworkFiles = await Promise.all(
      homeworkFiles.map(async ({ file, localUrl }) => {
        const uploaded = await uploadLectureHomeworkFile(file, lectureId);
        return {
          localUrl,
          realUrl: createUrlWithParams(LECTURE_HOMEWORK_FILE_GET_URI, {
            lectureId,
            fileId: uploaded?.id!,
          }),
        };
      })
    );

    uploadedLectureFiles.forEach(({ localUrl, realUrl }) => {
      content = content.replaceAll(localUrl, realUrl);
    });

    uploadedHomeworkFiles.forEach(({ localUrl, realUrl }) => {
      contentHomework = contentHomework.replaceAll(localUrl, realUrl);
    });

    const contentNode = rteRefContent.current?.editor?.state.doc;
    const contentHomeworkNode =
      rteRefContentHomeWork.current?.editor?.state.doc;

    const currentFileIds = [
      ...collectFileIds(contentNode!),
      ...collectFileIds(contentHomeworkNode!),
    ];

    const submissionData = {
      ...restData,
      speakers: emails,
      description,
      content,
      contentHomeWork: contentHomework,
    };

    await updateLecture({
      variables: { input: submissionData },
      onCompleted: async () => {
        for (const fileId of deletedLectureFileIds) {
          if (!currentFileIds.includes(fileId)) {
            await deleteLectureFile(lectureId, fileId);
          }
        }

        for (const fileId of deletedHomeworkFileIds) {
          if (!currentFileIds.includes(fileId)) {
            await deleteLectureHomeworkFile(lectureId, fileId);
          }
        }

        enqueueSnackbar("Урок обновлен", { variant: "success" });
      },
      onError: () => {
        enqueueSnackbar("Ошибка при обновлении", { variant: "error" });
      },
    });

    setPendingFiles([]);
    setDeletedLectureFileIds([]);
    setDeletedHomeworkFileIds([]);
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
  const handleDeleteLectureFile = (fileId: string) => {
    setDeletedLectureFileIds((prev) => Array.from(new Set([...prev, fileId])));
  };

  const handleDeleteHomeworkFile = (fileId: string) => {
    setDeletedHomeworkFileIds((prev) => Array.from(new Set([...prev, fileId])));
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
                handleDeleteFile={handleDeleteLectureFile}
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
                handleDeleteFile={handleDeleteHomeworkFile}
              />
            </StyledInfoStack>
          </StyledPaper>
          <StyledPaper>
            <StyledInfoStack>
              <Typography variant="h3">Тест для лекции</Typography>
              <SelectTests
                name="testGroupId"
                control={control}
                helperText="Выберите тест, который будет доступен студентам после изучения материалов лекции"
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
