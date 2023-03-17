import React from "react";
import { Box, FormControl, FormHelperText, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SubmitHandler, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { ISendComment, ISendCommentContent } from "./SendComment.types";
import RHF from "../../../../../shared/InputRHF";

const style = {
  loadingButton: {
    minWidth: "147px",
    mt: "5px",
  },
};

const SendComment: React.FC<ISendComment> = (props) => {
  const { sendComment, loading, id } = props;
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    reset,
    formState: { errors },
  } = useForm<ISendCommentContent>({
    defaultValues: {
      content: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        content: yup
          .string()
          .required(t("sendComment")!)
          .max(10000, t("sendComment.max")!),
      })
    ),
  });

  const handleSendComment: SubmitHandler<ISendCommentContent> = (data) => {
    sendComment({
      variables: { homeWorkId: id, content: data.content },
    }).then(() => {
      reset();
    });
  };

  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    if (value.length >= 10000) {
      setError("content", { message: t("sendHomework.max")! });
    } else {
      clearErrors("content");
    }
  };

  return (
    <form>
      <Typography mt="15px" mb="5px" variant="h5">
        Добавить комментарий
      </Typography>
      <Box width="100%">
        <FormControl fullWidth>
          <RHF.InputTextField
            placeholder="Текст ответа"
            multiline
            maxRows={10}
            minRows={2}
            name="content"
            control={control}
            inputProps={{ maxLength: 10000, onInput: handleInput }}
          />
          {errors?.content && (
            <FormHelperText error>{errors?.content.message}</FormHelperText>
          )}
        </FormControl>
      </Box>
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
