import { FC, useEffect, useRef, useState } from "react";
import type { Editor as TiptapEditor } from "@tiptap/core";
import { useParams } from "react-router-dom";
import { HOMEWORK_FILE_GET_URI } from "config";
import { Alert, Typography } from "@mui/material";

import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Editor } from "shared/components/text-editor";
import { useHomeworkFileDelete, useHomeworkFileUpload } from "shared/hooks";
import { PendingFile } from "shared/components/text-editor/types";
import SendButtons from "shared/components/send-buttons";
import { useTestAttemptsByLectureQuery } from "api/graphql/generated/graphql";
import {
  submitHomeworkRevision,
  HomeworkRevisionReceipt,
} from "shared/features/update-homework/submit-homework-revision";
import { revisionErrorMessage } from "shared/features/update-homework/use-homework-revision";

import { ISendHomeWork } from "./send-homework.types";
import { StyledBox, StyledFormHelperText } from "./send-homework.styled";

const SendHomework: FC<ISendHomeWork> = (props) => {
  const {
    createHomeWorkToCheck,
    sendHomeWorkToCheck,
    loadingCreateHomeWorkToCheck,
    loadingSendHomeWorkToCheck,
    loadingUpdateHomework,
    updateHomework,
    testGroup,
    trainingId,
    lectureId,
  } = props;
  const params = useParams();
  const currentLectureId = lectureId || params.lectureId;
  const currentTrainingId = trainingId || params.trainingId;

  const rteRef = useRef<RichTextEditorRef>(null);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);
  const { uploadHomeworkFile } = useHomeworkFileUpload({
    propagateErrors: true,
  });
  const { deleteHomeworkFile } = useHomeworkFileDelete({
    propagateErrors: true,
  });
  const [error, setError] = useState("");
  const mountedRef = useRef(true);
  useEffect(
    () => () => {
      mountedRef.current = false;
    },
    []
  );

  const { data: attemptsData, loading: attemptsLoading } =
    useTestAttemptsByLectureQuery({
      variables: {
        lectureId: currentLectureId || "",
        trainingId: currentTrainingId || "",
      },
      skip: !currentLectureId || !currentTrainingId || !testGroup,
    });

  const hasSuccessfulTestAttempt = attemptsData?.testAttempts?.some(
    (attempt) => attempt && attempt.result === true && attempt.endTime !== null
  );

  const canSubmitHomework = !testGroup || hasSuccessfulTestAttempt;

  const showSubmitError = (submitError: unknown) => {
    console.error(submitError);
    if (mountedRef.current) setError(revisionErrorMessage(submitError));
  };

  // The create cache write flips the card to UpdateHomeworkItem, which
  // unmounts this form — the submit chain deliberately keeps running on the
  // captured editor snapshot instead of silently dying mid-flight.
  const submitCreatedRevision = (homeWorkId: string, editor: TiptapEditor) => {
    const receipt: HomeworkRevisionReceipt = {
      homeworkId: homeWorkId,
      uploadedFiles: [],
      deletedFileIds: [],
    };
    submitHomeworkRevision(
      {
        updateHomework,
        sendHomeWorkToCheck,
        uploadFile: uploadHomeworkFile,
        deleteFile: deleteHomeworkFile,
        homeworkFileGetUri: HOMEWORK_FILE_GET_URI,
        isCurrent: () => true,
      },
      {
        homeworkId: homeWorkId,
        editor,
        pendingFiles,
        deletedFileIds,
        resubmit: true,
        existingFiles: [],
      },
      receipt
    )
      .then((result) => {
        if (!result || !mountedRef.current) return;
        setPendingFiles([]);
        setDeletedFileIds([]);
        setError("");
        rteRef.current?.editor?.commands.clearContent(false);
      })
      .catch(showSubmitError);
  };

  const handleSendHomeWork = () => {
    const editor = rteRef.current?.editor;
    if (!editor) return;

    const content = editor.getHTML().trim();
    if (!content || content === "<p></p>") {
      setError("Введите текст");
      return;
    }

    createHomeWorkToCheck({
      variables: {
        lectureId: currentLectureId!,
        trainingId: currentTrainingId!,
        content,
      },
      onError: () => showSubmitError(new Error("createHomeWorkToCheck failed")),
      onCompleted: (response) => {
        const homeWorkId = response?.createHomeWorkToCheck?.id;
        if (!homeWorkId) {
          showSubmitError(new Error("createHomeWorkToCheck returned no id"));
          return;
        }
        submitCreatedRevision(homeWorkId, editor);
      },
    });
  };

  const handleDeleteFile = (fileId: string) => {
    if (fileId.startsWith("blob:")) {
      setPendingFiles((prev) =>
        prev.filter((pending) => pending.localUrl !== fileId)
      );
    } else {
      setDeletedFileIds((prev) => Array.from(new Set([...prev, fileId])));
    }
  };

  return (
    <form>
      {testGroup && !hasSuccessfulTestAttempt && !attemptsLoading && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="body2">
            ⚠️ Вы еще не прошли тест по этой лекции. Для отправки домашнего
            задания необходимо успешно пройти тест.
          </Typography>
        </Alert>
      )}

      <StyledBox>
        <Editor
          rteRef={rteRef}
          setPendingFiles={setPendingFiles}
          handleDeleteFile={handleDeleteFile}
          source="studentHomework"
        />
        {error && <StyledFormHelperText>{error}</StyledFormHelperText>}

        <SendButtons
          onReply={handleSendHomeWork}
          loading={
            loadingCreateHomeWorkToCheck ||
            loadingUpdateHomework ||
            loadingSendHomeWorkToCheck
          }
          disabled={!canSubmitHomework}
        />
      </StyledBox>
    </form>
  );
};

export default SendHomework;
