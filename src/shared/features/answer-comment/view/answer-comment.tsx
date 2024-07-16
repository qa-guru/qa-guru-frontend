import UserRow from "shared/components/user-row";
import { FC, useRef, useState } from "react";
import { CommentEditor } from "shared/components/text-editor";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import SendButtons from "shared/components/send-buttons";

import {
  StyledBox,
  StyledCommentBox,
  StyledCommentStack,
  StyledFormHelperText,
} from "./answer-comment.styled";
import { IAnswerComment } from "./answer-comment.types";

const AnswerComment: FC<IAnswerComment> = (props) => {
  const { answerComment, loading, commentId, dataUser, onReplySuccess } = props;
  const rteRef = useRef<RichTextEditorRef>(null);
  const [error, setError] = useState("");

  const handleAnswerComment = async () => {
    const content = rteRef.current?.editor?.getHTML() ?? "";

    if (commentId && content.trim() !== "" && content.trim() !== "<p></p>") {
      try {
        await answerComment({
          variables: { parentID: commentId, content },
        }).then(() => {
          if (onReplySuccess) onReplySuccess();
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
    <StyledCommentStack>
      <UserRow
        user={dataUser?.user}
        userId={dataUser?.user?.id}
        hideFullName
        hideRating
        hasLink
      />
      <StyledCommentBox>
        <form>
          <StyledBox>
            <CommentEditor rteRef={rteRef} />
            {error && <StyledFormHelperText>{error}</StyledFormHelperText>}
          </StyledBox>
          <SendButtons
            onReply={handleAnswerComment}
            onCancel={onReplySuccess}
            loading={loading}
          />
        </form>
      </StyledCommentBox>
    </StyledCommentStack>
  );
};

export default AnswerComment;
