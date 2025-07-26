import { FC, useRef, useState } from "react";
import { HOMEWORK_COMMENT_FILE_GET_URI } from "config";

import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { CommentEditor } from "shared/components/text-editor";
import SendButtons from "shared/components/send-buttons";
import { useComment } from "shared/hooks/use-comment";
import {
  useHomeworkCommentFileDelete,
  useHomeworkCommentFileUpload,
  useRichTextFileManager,
} from "shared/hooks";
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
  const { uploadHomeworkCommentFile } = useHomeworkCommentFileUpload();
  const { deleteHomeworkCommentFile } = useHomeworkCommentFileDelete();
  const { setSelectedComment } = useComment();

  const {
    pendingFiles,
    setPendingFiles,
    deleteFile: handleDeleteFile,
    extractBlobUrls,
    recoverMissingFiles,
    uploadAllFiles,
    removeDeletedFiles,
    resetState,
  } = useRichTextFileManager({
    upload: async (file, commentId) => {
      const result = await uploadHomeworkCommentFile(file, commentId);
      if (!result?.id) throw new Error("Upload failed");
      return { id: result.id };
    },
    remove: async (commentId, fileId) => {
      const result = await deleteHomeworkCommentFile(commentId, fileId);
      if (result === null) throw new Error("Delete failed");
    },
    fileUrlBuilder: (fileId, commentId) =>
      createUrlWithParams(HOMEWORK_COMMENT_FILE_GET_URI, {
        commentId,
        fileId,
      }),
    getEntityId: () => commentId!,
  });

  const handleUpdateComment = async () => {
    const editor = rteRef.current?.editor;
    if (!editor || !commentId) return;

    let html = editor.getHTML().trim();
    if (!html || html === "<p></p>") {
      setError("Введите текст");
      return;
    }

    try {
      const blobUrls = extractBlobUrls(html);
      const recoveredFiles = await recoverMissingFiles(
        blobUrls,
        editor.state.doc
      );
      const allFiles = [...pendingFiles, ...recoveredFiles];

      html = await uploadAllFiles(allFiles, html);

      await updateComment({
        variables: { id: commentId, content: html },
        onCompleted: async () => {
          await removeDeletedFiles(editor.state.doc);

          setSelectedComment(null);
          resetState();
          setError("");
          editor.commands.clearContent();
        },
      });
    } catch (err) {
      console.error(err);
      setError("Произошла ошибка при редактировании комментария");
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
