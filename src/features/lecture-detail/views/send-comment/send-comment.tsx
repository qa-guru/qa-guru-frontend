import { FC, useRef } from "react";
import TextEditor from "shared/components/text-editor";
import { type RichTextEditorRef } from "mui-tiptap";

import { ISendComment } from "./send-comment.types";
import {
  StyledBox,
  StyledLoadingButton,
  StyledStack,
} from "./send-comment.styled";

const SendComment: FC<ISendComment> = (props) => {
  const { sendComment, loading, id } = props;
  const rteRef = useRef<RichTextEditorRef>(null);

  const handleSendComment = () => {
    if (id && rteRef) {
      sendComment({
        variables: {
          homeWorkId: id,
          content: rteRef.current?.editor?.getHTML() ?? "",
        },
      });
    }
  };

  return (
    <form>
      <StyledBox>
        <TextEditor rteRef={rteRef} />
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
