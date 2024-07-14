import { FC, useRef, useState } from "react";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Editor } from "shared/components/text-editor";
import { useParams } from "react-router-dom";
import SendButtons from "shared/components/send-buttons";

import { ISendHomeWork } from "./send-homework.types";
import { StyledBox, StyledFormHelperText } from "./send-homework.styled";

const SendHomework: FC<ISendHomeWork> = (props) => {
  const { sendHomeWorkToCheck, loading } = props;
  const { lectureId, trainingId } = useParams();
  const [error, setError] = useState("");
  const rteRef = useRef<RichTextEditorRef>(null);

  const handleSendHomeWork = () => {
    const content = rteRef.current?.editor?.getHTML() ?? "";

    if (content.trim() !== "" && content.trim() !== "<p></p>") {
      try {
        sendHomeWorkToCheck({
          variables: {
            trainingId: trainingId!,
            lectureId: lectureId!,
            content: rteRef.current?.editor?.getHTML() ?? "",
          },
        });
        setError("");
        rteRef.current?.editor?.commands.clearContent();
      } catch (error) {
        setError("Произошла ошибка при отправке д/з.");
      }
    } else {
      setError("Введите текст");
    }
  };

  return (
    <form>
      <StyledBox>
        <Editor rteRef={rteRef} />
        {error && <StyledFormHelperText>{error}</StyledFormHelperText>}
      </StyledBox>
      <SendButtons onReply={handleSendHomeWork} loading={loading} />
    </form>
  );
};

export default SendHomework;
