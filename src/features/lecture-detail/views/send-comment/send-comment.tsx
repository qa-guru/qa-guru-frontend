import { FC, useRef, useState } from "react";
import { CommentEditor } from "shared/components/text-editor";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";

import { ISendComment } from "./send-comment.types";
import { StyledBox, StyledFormHelperText } from "./send-comment.styled";
import SendButtons from "../../../../shared/components/send-buttons";

const SendComment: FC<ISendComment> = (props) => {
  const { sendComment, loading, homeworkId } = props;
  const rteRef = useRef<RichTextEditorRef>(null);
  const [error, setError] = useState("");

  const handleSendComment = async () => {
    const content = rteRef.current?.editor?.getHTML() ?? "";

    if (homeworkId && content.trim() !== "" && content.trim() !== "<p></p>") {
      try {
        await sendComment({
          variables: {
            homeWorkId: homeworkId,
            content,
          },
        });
        setError("");
        rteRef.current?.editor?.commands.clearContent();
      } catch (error) {
        setError("Произошла ошибка при отправке комментария.");
      }
    } else {
      setError("Введите текст");
    }
  };

  return (
    <form>
      <StyledBox>
        <CommentEditor rteRef={rteRef} />
        {error && <StyledFormHelperText>{error}</StyledFormHelperText>}
      </StyledBox>
      <SendButtons onReply={handleSendComment} loading={loading} hideCancel />
    </form>
  );
};

export default SendComment;
