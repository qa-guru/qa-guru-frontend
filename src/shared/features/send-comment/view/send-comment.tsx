import { FC, useRef, useState } from "react";
import { HOMEWORK_COMMENT_FILE_GET_URI } from "config";

import { CommentEditor } from "shared/components/text-editor";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import SendButtons from "shared/components/send-buttons";
import { PendingFile } from "shared/components/text-editor/types";
import { useHomeworkCommentFileUpload } from "shared/hooks";
import { createUrlWithParams } from "shared/utils";

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
  const { uploadHomeworkCommentFile } = useHomeworkCommentFileUpload();
  const [error, setError] = useState("");

  const handleSendComment = async () => {
    if (!rteRef.current?.editor) return;

    let content = rteRef.current.editor.getHTML().trim();
    if (!content || content === "<p></p>") {
      setError("Введите текст");
      return;
    }

    try {
      await sendComment({
        variables: {
          homeWorkId: homeworkId!,
          content,
        },
        onCompleted: async (response) => {
          const commentId = response?.sendComment?.id;

          if (!commentId) {
            return;
          }

          const uploadPromises = pendingFiles.map(
            async ({ file, localUrl }) => {
              const uploadedFile = await uploadHomeworkCommentFile(
                file,
                commentId
              );

              const realUrl = createUrlWithParams(
                HOMEWORK_COMMENT_FILE_GET_URI,
                {
                  commentId,
                  fileId: uploadedFile?.id!,
                }
              );

              return { localUrl, realUrl };
            }
          );

          const results = await Promise.all(uploadPromises);

          results.forEach(({ localUrl, realUrl }) => {
            content = content.replaceAll(localUrl, realUrl);
          });

          await updateComment({
            variables: {
              id: commentId,
              content,
            },
          });

          setPendingFiles([]);
          setError("");
          rteRef.current?.editor?.commands.clearContent();
        },
      });
    } catch (error) {
      setError("Произошла ошибка при отправке комментария.");
    }
  };

  return (
    <form>
      <StyledBox>
        <CommentEditor
          rteRef={rteRef}
          source="comment"
          setPendingFiles={setPendingFiles}
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
