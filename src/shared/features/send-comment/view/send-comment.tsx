import { FC, useRef, useState } from "react";
import { HOMEWORK_COMMENT_FILE_GET_URI } from "config";

import { CommentEditor } from "shared/components/text-editor";
import { collectFileIds, type RichTextEditorRef } from "shared/lib/mui-tiptap";
import SendButtons from "shared/components/send-buttons";
import { PendingFile } from "shared/components/text-editor/types";
import {
  useHomeworkCommentFileDelete,
  useHomeworkCommentFileUpload,
} from "shared/hooks";
import { createUrlWithParams } from "shared/utils";
import { findNodeByUrl } from "shared/lib/mui-tiptap/utils/find-node-by-url";
import { blobUrlToFile } from "shared/lib/mui-tiptap/utils/blob-url-to-file";

import { ISendComment } from "./send-comment.types";
import { StyledBox, StyledFormHelperText } from "./send-comment.styled";

const SendComment: FC<ISendComment> = (props) => {
  const {
    sendComment,
    loadingUpdateComment,
    loadingSendComment,
    homeworkId,
    updateComment,
  } = props;

  const rteRef = useRef<RichTextEditorRef>(null);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);
  const { uploadHomeworkCommentFile } = useHomeworkCommentFileUpload();
  const { deleteHomeworkCommentFile } = useHomeworkCommentFileDelete();
  const [error, setError] = useState("");

  const handleSendComment = async () => {
    const editor = rteRef.current?.editor;
    if (!editor || !homeworkId) return;

    let html = editor.getHTML().trim();
    if (!html || html === "<p></p>") {
      setError("Введите текст");
      return;
    }

    try {
      await sendComment({
        variables: {
          homeWorkId: homeworkId,
          content: html,
        },
        onCompleted: async (response) => {
          const commentId = response?.sendComment?.id;
          if (!commentId) return;

          const contentBlobUrls = Array.from(
            html.matchAll(/(blob:[^"'\s>]+)/g)
          ).map((match) => match[1]);

          const recoveredBlobs = contentBlobUrls
            .filter((url) => !pendingFiles.find((f) => f.localUrl === url))
            .map((url) => {
              const node = findNodeByUrl(editor.state.doc, url);
              const fileName = node?.fileName || "recovered_file";
              return { file: blobUrlToFile(url, fileName), localUrl: url };
            });

          const resolvedRecoveredFiles = await Promise.all(
            recoveredBlobs.map(async ({ file, localUrl }) => ({
              localUrl,
              file: await file,
            }))
          );

          const allFilesToUpload = [...pendingFiles, ...resolvedRecoveredFiles];

          const uploadResults = await Promise.all(
            allFilesToUpload.map(async ({ file, localUrl }) => {
              const uploaded = await uploadHomeworkCommentFile(file, commentId);
              const realUrl = createUrlWithParams(
                HOMEWORK_COMMENT_FILE_GET_URI,
                {
                  commentId,
                  fileId: uploaded?.id!,
                }
              );

              return { localUrl, realUrl };
            })
          );

          uploadResults.forEach(({ localUrl, realUrl }) => {
            html = html.replaceAll(localUrl, realUrl);
          });

          await updateComment({
            variables: {
              id: commentId,
              content: html,
            },
          });

          const contentNode = editor.state.doc;
          const currentFileIds = collectFileIds(contentNode);
          const stillDeleted = deletedFileIds.filter(
            (id) => !currentFileIds.includes(id)
          );

          for (const id of stillDeleted) {
            await deleteHomeworkCommentFile(commentId, id);
          }

          setPendingFiles([]);
          setDeletedFileIds([]);
          setError("");
          editor.commands.clearContent();
        },
      });
    } catch (error) {
      console.error(error);
      setError("Произошла ошибка при отправке комментария.");
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
          setPendingFiles={setPendingFiles}
          handleDeleteFile={handleDeleteFile}
        />
        {error && <StyledFormHelperText>{error}</StyledFormHelperText>}
      </StyledBox>
      <SendButtons
        onReply={handleSendComment}
        loading={loadingSendComment || loadingUpdateComment}
        hideCancel
      />
    </form>
  );
};

export default SendComment;
