import UserRow from "shared/components/user-row";
import { FC, useRef, useState } from "react";
import { CommentEditor } from "shared/components/text-editor";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { useTheme } from "@mui/system";
import { Button, IconButton, useMediaQuery } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SendIcon from "@mui/icons-material/Send";

import {
  StyledBox,
  StyledButtonStack,
  StyledCommentBox,
  StyledCommentStack,
  StyledFormHelperText,
  StyledLoadingButton,
} from "./answer-comment.styled";
import { IAnswerComment } from "./answer-comment.types";

interface IAnswerCommentForm {
  content: string;
}

const AnswerComment: FC<IAnswerComment> = (props) => {
  const { answerComment, loading, id, dataUser, onReplySuccess } = props;
  const rteRef = useRef<RichTextEditorRef>(null);
  const [error, setError] = useState("");
  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));

  const handleAnswerComment = async () => {
    const content = rteRef.current?.editor?.getHTML() ?? "";

    if (id && content.trim() !== "" && content.trim() !== "<p></p>") {
      try {
        await answerComment({
          variables: { parentID: id, content },
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
          <StyledButtonStack>
            {isDownMd ? (
              <IconButton onClick={onReplySuccess}>
                <ClearIcon color="primary" fontSize="small" />
              </IconButton>
            ) : (
              <Button
                color="secondary"
                variant="contained"
                onClick={onReplySuccess}
              >
                Отменить
              </Button>
            )}
            {isDownMd ? (
              <IconButton onClick={handleAnswerComment}>
                <SendIcon color="primary" fontSize="small" />
              </IconButton>
            ) : (
              <StyledLoadingButton
                variant="contained"
                onClick={handleAnswerComment}
                loading={loading}
              >
                Отправить
              </StyledLoadingButton>
            )}
          </StyledButtonStack>
        </form>
      </StyledCommentBox>
    </StyledCommentStack>
  );
};

export default AnswerComment;
