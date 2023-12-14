import { FC, useRef } from "react";
import { Editor } from "shared/components/text-editor";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";

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
        <Editor rteRef={rteRef} />
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
