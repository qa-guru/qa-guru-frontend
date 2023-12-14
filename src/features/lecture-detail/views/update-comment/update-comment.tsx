import { FC, useRef } from "react";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Editor } from "shared/components/text-editor";

import { IUpdateComment } from "./update-comment.types";
import {
  StyledBox,
  StyledButton,
  StyledButtonsStack,
  StyledLoadingButton,
  StyledStack,
} from "./update-comment.styled";

const UpdateComment: FC<IUpdateComment> = (props) => {
  const { loading, updateComment, id, setSelectedComment, content } = props;
  const rteRef = useRef<RichTextEditorRef>(null);

  const handleUpdateComment = () => {
    if (rteRef && id) {
      updateComment({
        variables: {
          id,
          content: rteRef.current?.editor?.getHTML() ?? "",
        },
        onCompleted: () => {
          setSelectedComment(null);
        },
      });
    }
  };

  return (
    <form>
      <StyledStack>
        <StyledBox>
          <Editor content={content} rteRef={rteRef} />
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
