import React from "react";
import { Box, FormControl, FormHelperText, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SubmitHandler, useForm } from "react-hook-form";
import Typography from "@mui/material/Typography";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { ISendComment, ISendCommentContent } from "./SendComment.types";
import { style } from "./styles";
import RHF from "../../../../shared/InputRHF";

const SendComment: React.FC<ISendComment> = (props) => {
  const { sendComment, loading, id } = props;
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
    trigger,
  } = useForm<ISendCommentContent>({
    defaultValues: {
      content: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        content: yup.string().required(t("comment")!),
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

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    trigger("content").then((isValid) => {
      if (isValid && e.target.value.length >= 10000) {
        setError("content", {
          type: "manual",
          message: t("comment.max")!,
        });
      }
    });
  };

  return (
    <form>
      <Typography mt={3} mb={2} variant="h5">
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
            inputProps={{ maxLength: 10000, onChange: handleChange }}
          />
          {errors?.content && (
            <FormHelperText error>{errors?.content.message}</FormHelperText>
          )}
        </FormControl>
      </Box>
      <Stack direction="column" alignItems="flex-end" mt={2}>
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
