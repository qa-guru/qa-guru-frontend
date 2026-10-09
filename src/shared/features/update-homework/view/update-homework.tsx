import { FC, useEffect, useRef, useState } from "react";
import { Alert } from "@mui/material";

import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Editor } from "shared/components/text-editor";
import type { PendingFile } from "shared/components/text-editor/types";

import { IUpdateHomeWork } from "./update-homework.types";
import {
  StyledBox,
  StyledCancelButton,
  StyledLoadingButton,
  StyledStack,
  StyledWrapper,
} from "./update-homework.styled";
import useHomeworkRevision from "../use-homework-revision";

const UpdateHomework: FC<IUpdateHomeWork> = (props) => {
  const {
    loading,
    updateHomework,
    sendHomeWorkToCheck,
    setOpenHomeWorkEdit,
    answer,
    homeWorkId,
    resubmit = false,
    submitLabel,
    refreshHomework,
  } = props;
  const rteRef = useRef<RichTextEditorRef>(null);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);
  const revision = useHomeworkRevision(
    homeWorkId,
    {
      updateHomework,
      sendHomeWorkToCheck,
    },
    refreshHomework
  );
  const busy = loading || revision.loading;

  useEffect(() => {
    setPendingFiles([]);
    setDeletedFileIds([]);
  }, [homeWorkId]);

  const handleUpdateHomework = async () => {
    const editor = rteRef.current?.editor;
    if (!editor || !homeWorkId || busy) return;
    const result = await revision.submit({
      editor,
      pendingFiles,
      deletedFileIds,
      resubmit,
    });
    if (result) setOpenHomeWorkEdit(false);
  };

  const handleDeleteFile = (fileId: string) => {
    if (fileId.startsWith("blob:")) {
      setPendingFiles((previous) =>
        previous.filter((file) => file.localUrl !== fileId)
      );
    } else {
      setDeletedFileIds((previous) =>
        Array.from(new Set([...previous, fileId]))
      );
    }
  };

  const buttonLabel = resubmit
    ? submitLabel ?? "Отправить повторно"
    : "Сохранить";

  return (
    <form
      aria-label="Исправление ответа"
      onSubmit={(event) => {
        event.preventDefault();
        handleUpdateHomework();
      }}
    >
      <StyledWrapper>
        <StyledBox>
          <Editor
            key={homeWorkId}
            content={answer}
            rteRef={rteRef}
            setPendingFiles={setPendingFiles}
            source="studentHomework"
            handleDeleteFile={handleDeleteFile}
            disabled={busy}
          />
          {resubmit && (
            <Alert severity="info" sx={{ mt: 2 }}>
              Сначала сохраним исправленный ответ, затем отправим его на
              проверку. Окончательное решение принимает ментор.
            </Alert>
          )}
          {revision.error && (
            <Alert
              severity={revision.saved ? "warning" : "error"}
              sx={{ mt: 2 }}
            >
              {revision.error}
            </Alert>
          )}
          <StyledStack>
            <StyledCancelButton
              variant="contained"
              color="secondary"
              disabled={busy}
              onClick={() => setOpenHomeWorkEdit(false)}
            >
              Отменить
            </StyledCancelButton>
            <StyledLoadingButton
              type="submit"
              variant="contained"
              loading={busy}
              disabled={busy}
            >
              {revision.error && resubmit ? "Повторить отправку" : buttonLabel}
            </StyledLoadingButton>
          </StyledStack>
        </StyledBox>
      </StyledWrapper>
    </form>
  );
};

export default UpdateHomework;
