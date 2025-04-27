import { FC, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { HOMEWORK_FILE_GET_URI } from "config";

import { createUrlWithParams } from "shared/utils";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Editor } from "shared/components/text-editor";
import { useHomeworkFileDelete, useHomeworkFileUpload } from "shared/hooks";
import { PendingFile } from "shared/components/text-editor/types";
import SendButtons from "shared/components/send-buttons";

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
  } = props;
  const { lectureId, trainingId } = useParams();

  const rteRef = useRef<RichTextEditorRef>(null);
  const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
  const [deletedFileIds, setDeletedFileIds] = useState<string[]>([]);
  const { uploadHomeworkFile } = useHomeworkFileUpload();
  const { deleteHomeworkFile } = useHomeworkFileDelete();
  const [error, setError] = useState("");

  const handleSendHomeWork = () => {
    if (!rteRef.current?.editor) return;

    let content = rteRef.current.editor.getHTML().trim();
    if (!content || content === "<p></p>") {
      setError("Введите текст");
      return;
    }

    try {
      createHomeWorkToCheck({
        variables: {
          lectureId: lectureId!,
          trainingId: trainingId!,
          content,
        },
        onCompleted: async (response) => {
          const homeWorkId = response?.createHomeWorkToCheck?.id;

          if (!homeWorkId) {
            return;
          }

          const uploadPromises = pendingFiles.map(
            async ({ file, localUrl }) => {
              const uploadedFile = await uploadHomeworkFile(file, homeWorkId);

              const realUrl = createUrlWithParams(HOMEWORK_FILE_GET_URI, {
                homeWorkId,
                fileId: uploadedFile?.id!,
              });

              return { localUrl, realUrl };
            }
          );

          const results = await Promise.all(uploadPromises);

          results.forEach(({ localUrl, realUrl }) => {
            content = content.replaceAll(localUrl, realUrl);
          });

          await updateHomework({
            variables: {
              id: homeWorkId,
              content,
            },
          });

          for (const id of deletedFileIds) {
            await deleteHomeworkFile(homeWorkId, id);
          }

          await sendHomeWorkToCheck({
            variables: {
              homeWorkId,
            },
          });

          setPendingFiles([]);
          setDeletedFileIds([]);
          setError("");
          rteRef.current?.editor?.commands.clearContent();
        },
      });
    } catch (error) {
      setError("Произошла ошибка при отправке д/з.");
    }
  };

  const handleDeleteFile = (fileId: string) => {
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
        />
      </StyledBox>
    </form>
  );
};

export default SendHomework;
