import { FC, useRef } from "react";
import { type RichTextEditorRef } from "mui-tiptap";
import TextEditor from "shared/components/text-editor";

import { IUpdateComment } from "./update-comment.types";
import {
  StyledBox,
  StyledButton,
  StyledButtonsStack,
  StyledLoadingButton,
  StyledStack,
} from "./update-comment.styled";
import { INITIAL_SELECTED_INDEX } from "../../constants";

const UpdateComment: FC<IUpdateComment> = (props) => {
  const { loading, updateComment, id, setSelectedIndex, content } = props;
  const rteRef = useRef<RichTextEditorRef>(null);

  const handleUpdateComment = () => {
    if (rteRef && id) {
      updateComment({
        variables: {
          id,
          content: rteRef.current?.editor?.getHTML() ?? "",
        },
        onCompleted: () => {
          setSelectedIndex(INITIAL_SELECTED_INDEX);
        },
      });
    }
  };

  return (
    <form>
      <StyledStack>
        <StyledBox>
          <TextEditor content={content} rteRef={rteRef} />
          <StyledButtonsStack>
            <StyledButton
              variant="contained"
              onClick={() => setSelectedIndex(INITIAL_SELECTED_INDEX)}
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
