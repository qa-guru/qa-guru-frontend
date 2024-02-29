import { FC, useRef, useState } from "react";
import { CommentEditor } from "shared/components/text-editor";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";

import { ISendComment } from "./send-comment.types";
import {
  StyledBox,
  StyledFormHelperText,
  StyledLoadingButton,
  StyledStack,
} from "./send-comment.styled";

const SendComment: FC<ISendComment> = (props) => {
  const { sendComment, loading, id } = props;
  const rteRef = useRef<RichTextEditorRef>(null);
  const [error, setError] = useState("");

  const handleSendComment = async () => {
    const content = rteRef.current?.editor?.getHTML() ?? "";

    if (id && content.trim() !== "" && content.trim() !== "<p></p>") {
      try {
        await sendComment({
          variables: {
            homeWorkId: id,
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
      <StyledStack>
        <StyledLoadingButton
          variant="contained"
          onClick={handleSendComment}
          loading={loading}
        >
          Отправить
        </StyledLoadingButton>
      </StyledStack>
    </form>
  );
};

export default SendComment;
