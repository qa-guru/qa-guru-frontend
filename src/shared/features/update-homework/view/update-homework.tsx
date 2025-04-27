import { FC, useRef, useState } from "react";
import { HOMEWORK_FILE_GET_URI } from "config";

import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Editor } from "shared/components/text-editor";
import SendButtons from "shared/components/send-buttons";
import { createUrlWithParams } from "shared/utils";
import { useHomeworkFileDelete, useHomeworkFileUpload } from "shared/hooks";
import { PendingFile } from "shared/components/text-editor/types";

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

  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);
  const [error, setError] = useState("");
  const { uploadHomeworkFile } = useHomeworkFileUpload();
  const { deleteHomeworkFile } = useHomeworkFileDelete();

  const handleUpdateHomework = async () => {
    if (!rteRef.current?.editor || !homeWorkId) return;

    let content = rteRef.current.editor.getHTML().trim();
    if (!content || content === "<p></p>") {
      setError("Введите текст");
      return;
    }

    try {
      const uploadPromises = pendingFiles.map(async ({ file, localUrl }) => {
        const uploadedFile = await uploadHomeworkFile(file, homeWorkId);

        const realUrl = createUrlWithParams(HOMEWORK_FILE_GET_URI, {
          homeWorkId,
          fileId: uploadedFile?.id!,
        });

        return { localUrl, realUrl };
      });

      const results = await Promise.all(uploadPromises);

      results.forEach(({ localUrl, realUrl }) => {
        content = content.replaceAll(localUrl, realUrl);
      });

      await updateHomework({
        variables: { id: homeWorkId, content },
      });

      for (const id of deletedFileIds) {
        await deleteHomeworkFile(homeWorkId, id);
      }

      setOpenHomeWorkEdit(false);
      setPendingFiles([]);
      setDeletedFileIds([]);
      setError("");
      rteRef.current?.editor?.commands.clearContent();
    } catch (err) {
      console.error(err);
      setError("Произошла ошибка при редактировании д/з.");
    }
  };

  const handleDeleteFile = async (fileId: string) => {
    if (fileId.startsWith("blob:")) {
      setPendingFiles((prev) =>
        prev.filter((pending) => pending.localUrl !== fileId)
      );
    } else {
      setDeletedFileIds((prev) => [...prev, fileId]);
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
