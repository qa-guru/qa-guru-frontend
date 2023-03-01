import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { ISendComment, ISendCommentContent } from "./SendComment.types";
import RHF from "../../../../shared/InputRHF";
import { client } from "../../../../api/http";

const style = {
  loadingButton: {
    textTransform: "none",
    minWidth: "151px",
  },
  paper: { padding: "20px", mt: "40px" },
  buttonCancel: {
    textTransform: "none",
    minWidth: "151px",
  },
};

const SendComment: React.FC<ISendComment> = (props) => {
  const { sendComment, loading, setAddComment, id } = props;
  const { handleSubmit, control } = useForm<ISendCommentContent>({
    defaultValues: {
      content: "",
    },
  });

  const handleSendComment: SubmitHandler<ISendCommentContent> = (data) => {
    sendComment({
      variables: { homeWorkId: id, content: data.content },
      onCompleted: () =>
        client.refetchQueries({ include: ["commentsHomeWorkByHomeWork"] }),
    }).then(() => {
      setAddComment(false);
    });
  };

  return (
    <form>
      <Stack direction="row" spacing={2}>
        <Box width="100%">
          <RHF.InputTextField
            placeholder="Текст ответа"
            multiline
            rows={5}
            name="content"
            control={control}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} mt="15px">
            <LoadingButton
              onClick={handleSubmit(handleSendComment)}
              loading={loading}
              sx={style.loadingButton}
              variant="contained"
            >
              Отправить
            </LoadingButton>
            <Button
              onClick={() => setAddComment(false)}
              sx={style.buttonCancel}
              variant="contained"
            >
              Отменить
            </Button>
          </Stack>
        </Box>
      </Stack>
    </form>
  );
};

export default SendComment;
