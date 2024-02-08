import { FC, useRef, useState } from "react";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Editor } from "shared/components/text-editor";

import { IUpdateComment } from "./update-comment.types";
import {
  StyledBox,
  StyledButton,
  StyledButtonsStack,
  StyledLoadingButton,
  StyledStack,
  StyledFormHelperText,
} from "./update-comment.styled";
import { useComment } from "../../../../shared/context/comment-context";

const UpdateComment: FC<IUpdateComment> = (props) => {
  const { loading, updateComment, id, content } = props;
  const rteRef = useRef<RichTextEditorRef>(null);
  const [error, setError] = useState("");
  const { setSelectedComment } = useComment();

  const handleUpdateComment = () => {
    const content = rteRef.current?.editor?.getHTML() ?? "";

    if (id && content.trim() !== "" && content.trim() !== "<p></p>") {
      updateComment({
        variables: {
          id,
          content: rteRef.current?.editor?.getHTML() ?? "",
        },
        onCompleted: () => {
          setSelectedComment(null);
        },
      });
      setError("");
    } else {
      setError("Введите текст");
    }
  };

  return (
    <form>
      <StyledStack>
        <StyledBox>
          <Editor content={content} rteRef={rteRef} />
          {error && <StyledFormHelperText>{error}</StyledFormHelperText>}
          <StyledButtonsStack>
            <StyledButton
              variant="contained"
              onClick={() => setSelectedComment(null)}
            >
              Отменить
            </StyledButton>
            <StyledLoadingButton
              variant="contained"
              onClick={handleUpdateComment}
              loading={loading}
            >
              Отправить
            </StyledLoadingButton>
          </StyledButtonsStack>
        </StyledBox>
      </StyledStack>
    </form>
  );
};

export default UpdateComment;
