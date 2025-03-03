import { FC, useRef, useState } from "react";
import { HOMEWORK_FILE_GET_URI } from "config";

import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Editor } from "shared/components/text-editor";
import SendButtons from "shared/components/send-buttons";
import { createUrlWithParams } from "shared/utils";
import { useHomeworkFileUpload } from "shared/hooks";
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
  const [error, setError] = useState("");
  const { uploadHomeworkFile } = useHomeworkFileUpload();

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
        onCompleted: () => {
          setOpenHomeWorkEdit(false);
          setPendingFiles([]);
          setError("");
          rteRef.current?.editor?.commands.clearContent();
        },
      });
    } catch (err) {
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
