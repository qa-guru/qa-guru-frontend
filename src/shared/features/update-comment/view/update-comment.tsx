import { FC, useRef, useState } from "react";

import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { CommentEditor } from "shared/components/text-editor";
import SendButtons from "shared/components/send-buttons";
import { useComment } from "shared/hooks/use-comment";

import { IUpdateComment } from "./update-comment.types";
import {
  StyledBox,
  StyledStack,
  StyledFormHelperText,
} from "./update-comment.styled";

const UpdateComment: FC<IUpdateComment> = (props) => {
  const { loading, updateComment, commentId, content } = props;
  const rteRef = useRef<RichTextEditorRef>(null);
  const [error, setError] = useState("");
  const { setSelectedComment } = useComment();

  const handleUpdateComment = () => {
    const content = rteRef.current?.editor?.getHTML() ?? "";

    if (commentId && content.trim() !== "" && content.trim() !== "<p></p>") {
      updateComment({
        variables: {
          id: commentId,
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
          <CommentEditor content={content} rteRef={rteRef} source="comment" />
          {error && <StyledFormHelperText>{error}</StyledFormHelperText>}
          <SendButtons
            onReply={handleUpdateComment}
            onCancel={() => setSelectedComment(null)}
            loading={loading}
          />
        </StyledBox>
      </StyledStack>
    </form>
  );
};

export default UpdateComment;
