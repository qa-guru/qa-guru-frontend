import { FC, useEffect, useRef, useState } from "react";

import { CommentEditor } from "shared/components/text-editor";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import SendButtons from "shared/components/send-buttons";
import {
  CommentAttachment,
  PendingFile,
} from "shared/components/text-editor/types";
import { splitCommentAttachments } from "shared/components/text-editor/text-view/prepare-read-only-html";

import {
  CommentContentSyncError,
  EmptyCommentError,
} from "../submit-homework-comment";
import { ISendComment } from "./send-comment.types";
import { StyledBox, StyledFormHelperText } from "./send-comment.styled";

const SendComment: FC<ISendComment> = (props) => {
  const {
    submitComment,
    loading,
    content,
    commentId,
    onSuccess,
    onCancel,
    hideCancel = true,
  } = props;

  const rteRef = useRef<RichTextEditorRef>(null);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [attachments, setAttachments] = useState<CommentAttachment[]>(
    () => splitCommentAttachments(content ?? "").attachments
  );
  const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const inFlightRef = useRef(false);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleSendComment = async () => {
    const editor = rteRef.current?.editor;
    if (!editor || inFlightRef.current) return;

    inFlightRef.current = true;
    setSubmitting(true);
    try {
      await submitComment({
        editor,
        pendingFiles,
        deletedFileIds,
        attachments,
        commentId,
        sentHtml: content,
      });
      if (!mountedRef.current || editor.isDestroyed) return;
      setPendingFiles([]);
      setAttachments([]);
      setDeletedFileIds([]);
      setError("");
      editor.commands.clearContent(false);
      onSuccess?.();
    } catch (error) {
      if (!mountedRef.current) return;
      if (error instanceof EmptyCommentError) {
        setError("Введите текст");
      } else if (error instanceof CommentContentSyncError) {
        setError(
          "Комментарий сохранён, но файлы или содержимое не синхронизированы. Повторите отправку для того же комментария."
        );
      } else {
        console.error(error);
        setError("Произошла ошибка при отправке комментария.");
      }
    } finally {
      inFlightRef.current = false;
      if (mountedRef.current) setSubmitting(false);
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

  return (
    <form>
      <StyledBox>
        <CommentEditor
          rteRef={rteRef}
          source="comment"
          content={content}
          attachments={attachments}
          setAttachments={setAttachments}
          disabled={loading || submitting}
          setPendingFiles={setPendingFiles}
          handleDeleteFile={handleDeleteFile}
        />
        {error && <StyledFormHelperText>{error}</StyledFormHelperText>}
      </StyledBox>
      <SendButtons
        onReply={handleSendComment}
        loading={loading || submitting}
        disabled={loading || submitting}
        hideCancel={hideCancel}
        onCancel={onCancel}
      />
    </form>
  );
};

export default SendComment;
