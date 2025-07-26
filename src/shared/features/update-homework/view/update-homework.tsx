import { FC, useRef, useState } from "react";
import { HOMEWORK_FILE_GET_URI } from "config";

import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Editor } from "shared/components/text-editor";
import SendButtons from "shared/components/send-buttons";
import { createUrlWithParams } from "shared/utils";
import {
  useHomeworkFileDelete,
  useHomeworkFileUpload,
  useRichTextFileManager,
} from "shared/hooks";

import { IUpdateHomeWork } from "./update-homework.types";
import {
  StyledBox,
  StyledFormHelperText,
  StyledWrapper,
} from "./update-homework.styled";

const UpdateHomework: FC<IUpdateHomeWork> = (props) => {
  const { loading, updateHomework, setOpenHomeWorkEdit, answer, homeWorkId } =
    props;
  const rteRef = useRef<RichTextEditorRef>(null);
  const [error, setError] = useState("");
  const { uploadHomeworkFile } = useHomeworkFileUpload();
  const { deleteHomeworkFile } = useHomeworkFileDelete();

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
    upload: async (file, homeWorkId) => {
      const result = await uploadHomeworkFile(file, homeWorkId);
      if (!result?.id) throw new Error("Upload failed or missing file ID");
      return { id: result.id };
    },
    remove: async (homeWorkId, fileId) => {
      const result = await deleteHomeworkFile(homeWorkId, fileId);
      if (result === null) throw new Error("Deletion failed");
    },
    fileUrlBuilder: (fileId, homeWorkId) =>
      createUrlWithParams(HOMEWORK_FILE_GET_URI, { homeWorkId, fileId }),
    getEntityId: () => homeWorkId!,
  });

  const handleUpdateHomework = async () => {
    const editor = rteRef.current?.editor;
    if (!editor || !homeWorkId) return;

    let content = editor.getHTML().trim();
    if (!content || content === "<p></p>") {
      setError("Введите текст");
      return;
    }

    try {
      const blobUrls = extractBlobUrls(content);
      const recoveredFiles = await recoverMissingFiles(
        blobUrls,
        editor.state.doc
      );
      const allFiles = [...pendingFiles, ...recoveredFiles];

      content = await uploadAllFiles(allFiles, content);

      await updateHomework({
        variables: { id: homeWorkId, content },
      });

      await removeDeletedFiles(editor.state.doc);

      setOpenHomeWorkEdit(false);
      resetState();
      setError("");
      editor.commands.clearContent();
    } catch (err) {
      console.error(err);
      setError("Произошла ошибка при редактировании д/з.");
    }
  };

  return (
    <form>
      <StyledWrapper>
        <StyledBox>
          <Editor
            content={answer}
            rteRef={rteRef}
            setPendingFiles={setPendingFiles}
            source="studentHomework"
            handleDeleteFile={handleDeleteFile}
          />
          {error && <StyledFormHelperText>{error}</StyledFormHelperText>}

          <SendButtons
            onReply={handleUpdateHomework}
            onCancel={() => setOpenHomeWorkEdit(false)}
            loading={loading}
          />
        </StyledBox>
      </StyledWrapper>
    </form>
  );
};

export default UpdateHomework;
