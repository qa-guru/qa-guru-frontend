import { FC, useRef, useState } from "react";
import { HOMEWORK_COMMENT_FILE_GET_URI } from "config";

import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { CommentEditor } from "shared/components/text-editor";
import SendButtons from "shared/components/send-buttons";
import { useComment } from "shared/hooks/use-comment";
import {
  useHomeworkCommentFileDelete,
  useHomeworkCommentFileUpload,
} from "shared/hooks";
import { PendingFile } from "shared/components/text-editor/types";
import { createUrlWithParams } from "shared/utils";

import { IUpdateComment } from "./update-comment.types";
import {
  StyledBox,
  StyledStack,
  StyledFormHelperText,
} from "./update-comment.styled";

const UpdateComment: FC<IUpdateComment> = (props) => {
  const { loading, updateComment, commentId, content } = props;
  const rteRef = useRef<RichTextEditorRef>(null);
  const [error, setError] = useState("");
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);
  const { uploadHomeworkCommentFile } = useHomeworkCommentFileUpload();
  const { setSelectedComment } = useComment();
  const { deleteHomeworkCommentFile } = useHomeworkCommentFileDelete();

  const handleUpdateComment = async () => {
    if (!rteRef.current?.editor || !commentId) return;

    let content = rteRef.current.editor.getHTML().trim();
    if (!content || content === "<p></p>") {
      setError("Введите текст");
      return;
    }

    try {
      const uploadPromises = pendingFiles.map(async ({ file, localUrl }) => {
        const uploadedFile = await uploadHomeworkCommentFile(file, commentId);

        const realUrl = createUrlWithParams(HOMEWORK_COMMENT_FILE_GET_URI, {
          commentId,
          fileId: uploadedFile?.id!,
        });

        return { localUrl, realUrl };
      });

      const results = await Promise.all(uploadPromises);

      results.forEach(({ localUrl, realUrl }) => {
        content = content.replaceAll(localUrl, realUrl);
      });
      await updateComment({
        variables: { id: commentId, content },
        onCompleted: async () => {
          for (const fileId of deletedFileIds) {
            await deleteHomeworkCommentFile(commentId, fileId);
          }
          setSelectedComment(null);
          setPendingFiles([]);
          setDeletedFileIds([]);
          setError("");
          rteRef.current?.editor?.commands.clearContent();
        },
      });
    } catch (err) {
      setError("Произошла ошибка при редактировании комментария");
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (fileId.startsWith("blob:")) {
      setPendingFiles((prev) =>
        prev.filter((pending) => pending.localUrl !== fileId)
      );
    } else {
      // серверный файл — добавить в список на удаление
      setDeletedFileIds((prev) => [...prev, fileId]);
    }
  };

  return (
    <form>
      <StyledStack>
        <StyledBox>
          <CommentEditor
            content={content}
            setPendingFiles={setPendingFiles}
            handleDeleteFile={handleDeleteFile}
            rteRef={rteRef}
            source="comment"
          />
          {error && <StyledFormHelperText>{error}</StyledFormHelperText>}
          <SendButtons
            onReply={handleUpdateComment}
            onCancel={() => setSelectedComment(null)}
            loading={loading}
          />
        </StyledBox>
      </StyledStack>
    </form>
  );
};

export default UpdateComment;
