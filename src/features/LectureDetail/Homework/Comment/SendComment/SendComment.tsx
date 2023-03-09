import React from "react";
import { Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SubmitHandler, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import { ISendComment, ISendCommentContent } from "./SendComment.types";
import RHF from "../../../../../shared/InputRHF";
import { client } from "../../../../../api";

const style = {
  loadingButton: {
    minWidth: "147px",
    mt: "5px",
  },
};

const SendComment: React.FC<ISendComment> = (props) => {
  const { sendComment, loading, id } = props;

  const { handleSubmit, control, reset } = useForm<ISendCommentContent>({
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
      reset();
    });
  };

  return (
    <form>
      <Typography mt="15px" mb="5px" variant="h5">
        Добавить комментарий
      </Typography>
      <Stack width="100%">
        <RHF.InputTextField
          placeholder="Текст ответа"
          multiline
          maxRows={10}
          minRows={2}
          name="content"
          control={control}
        />
      </Stack>
      <Stack direction="column" alignItems="flex-end">
        <LoadingButton
          onClick={handleSubmit(handleSendComment)}
          loading={loading}
          sx={style.loadingButton}
          variant="contained"
        >
          Отправить
        </LoadingButton>
      </Stack>
    </form>
  );
};

export default SendComment;
