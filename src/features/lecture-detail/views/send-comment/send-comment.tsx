import { FC, useRef, useState } from "react";
import { Editor } from "shared/components/text-editor";
import { type RichTextEditorRef } from "shared/lib/mui-tiptap";
import { Typography } from "@mui/material";

import { ISendComment } from "./send-comment.types";
import {
  StyledBox,
  StyledLoadingButton,
  StyledStack,
} from "./send-comment.styled";

const SendComment: FC<ISendComment> = (props) => {
  const { sendComment, loading, id } = props;
  const rteRef = useRef<RichTextEditorRef>(null);
  const [error, setError] = useState("");

  const handleSendComment = () => {
    const content = rteRef.current?.editor?.getHTML() ?? "";

    if (id && content.trim() !== "" && content.trim() !== "<p></p>") {
      sendComment({
        variables: {
          homeWorkId: id,
          content,
        },
      });
      setError("");
    } else {
      setError("Comment cannot be empty.");
    }
  };

  return (
    <form>
      <StyledBox>
        <Editor rteRef={rteRef} />
        {error && <Typography>{error}</Typography>}
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
