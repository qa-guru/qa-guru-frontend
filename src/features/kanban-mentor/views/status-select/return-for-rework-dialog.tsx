import { FC, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { Maybe, StudentHomeWorkStatus } from "api/graphql/generated/graphql";
import { CommentEditor } from "shared/components/text-editor";
import type { RichTextEditorRef } from "shared/lib/mui-tiptap";
import type {
  CommentAttachment,
  PendingFile,
} from "shared/components/text-editor/types";
import { splitCommentAttachments } from "shared/components/text-editor/text-view/prepare-read-only-html";
import {
  CommentContentSyncError,
  EmptyCommentError,
} from "shared/features/send-comment/submit-homework-comment";
import {
  StyledBox,
  StyledFormHelperText,
} from "shared/features/send-comment/view/send-comment.styled";
import { STATES } from "shared/constants";

import useReturnForRework from "../../hooks/use-return-for-rework";

export interface IReturnForReworkDialog {
  homeworkId?: Maybe<string>;
  open: boolean;
  initialContent?: Maybe<string>;
  onClose: () => void;
  onDone: (status: StudentHomeWorkStatus) => void;
}

const statusLabel = (status?: Maybe<StudentHomeWorkStatus>) =>
  STATES.find((state) => state.value === status)?.text ??
  status ??
  "неизвестен";

const ReturnForReworkDialog: FC<IReturnForReworkDialog> = ({
  homeworkId,
  open,
  initialContent,
  onClose,
  onDone,
}) => {
  const { submit, phase, outcome, commentId, commentSynced } =
    useReturnForRework(homeworkId);
  const rteRef = useRef<RichTextEditorRef>(null);
  // tiptap creates the editor in an effect; sync the imperative handle after mount.
  const [, forceEditorSync] = useState(0);
  useEffect(() => {
    forceEditorSync((value) => value + 1);
  }, [open, commentSynced]);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);
  const [commentError, setCommentError] = useState("");
  const [attachments, setAttachments] = useState<CommentAttachment[]>(
    () => splitCommentAttachments(initialContent ?? "").attachments
  );

  useEffect(() => {
    setAttachments(splitCommentAttachments(initialContent ?? "").attachments);
    setPendingFiles([]);
    setDeletedFileIds([]);
    setCommentError("");
  }, [homeworkId, initialContent]);

  const busy = phase === "submitting";

  const commentErrorFor = (error: unknown) => {
    if (error instanceof EmptyCommentError) return "Введите текст";
    if (error instanceof CommentContentSyncError) {
      return "Комментарий сохранён, но файлы или содержимое не синхронизированы. Повторите.";
    }
    return "Не удалось сохранить комментарий. Попробуйте ещё раз.";
  };

  const handleConfirm = async () => {
    setCommentError("");
    const result = await submit({
      editor: rteRef.current?.editor ?? null,
      pendingFiles,
      deletedFileIds,
      attachments,
    });

    if (!result) return;

    if (result.kind === "done") {
      onDone(result.status ?? StudentHomeWorkStatus.NotApproved);
      return;
    }

    if (result.kind === "comment-failed") {
      setCommentError(commentErrorFor(result.error));
    }
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

  const partialResult =
    outcome?.kind === "status-failed"
      ? `Комментарий сохранён, но статус не изменён. Текущий статус: ${statusLabel(
          outcome.status
        )}. Проверьте данные и повторите.`
      : null;

  return (
    <Dialog
      open={open}
      onClose={busy ? undefined : onClose}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Вернуть на доработку</DialogTitle>
      <DialogContent>
        <DialogContentText>Опишите, что нужно исправить</DialogContentText>
        <DialogContentText>
          Комментарий будет отправлен студенту, затем работа будет возвращена на
          доработку.
        </DialogContentText>
        {commentSynced && (
          <Alert severity="info" sx={{ mt: 2 }}>
            Комментарий уже сохранён для этой работы — повторная отправка не
            требуется.
          </Alert>
        )}
        <StyledBox>
          <CommentEditor
            key={homeworkId}
            rteRef={rteRef}
            source="comment"
            content={initialContent}
            attachments={attachments}
            setAttachments={setAttachments}
            disabled={busy || commentSynced}
            setPendingFiles={setPendingFiles}
            handleDeleteFile={handleDeleteFile}
          />
          {commentError && (
            <StyledFormHelperText>{commentError}</StyledFormHelperText>
          )}
        </StyledBox>
        {partialResult && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            {partialResult}
          </Alert>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={busy}>
          Отмена
        </Button>
        <LoadingButton
          variant="contained"
          loading={busy}
          disabled={!homeworkId}
          onClick={handleConfirm}
        >
          {commentId ? "Повторить возврат" : "Отправить и вернуть"}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default ReturnForReworkDialog;
