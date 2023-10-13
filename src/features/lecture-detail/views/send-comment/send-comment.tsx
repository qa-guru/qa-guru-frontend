import React from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import RHF from "shared/components/input-RHF";
import { ISendComment, ISendCommentContent } from "./send-comment.types";
import {
  StyledBox,
  StyledLoadingButton,
  StyledStack,
  StyledTypography,
} from "./send-comment.styled";
import { MAX_COMMENT_LENGTH } from "../../constants/constants";

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
      if (isValid && e.target.value.length >= MAX_COMMENT_LENGTH) {
        setError("content", {
          type: "manual",
          message: t("comment.max")!,
        });
      }
    });
  };

  return (
    <form>
      <StyledTypography variant="h5">Добавить комментарий</StyledTypography>
      <StyledBox>
        <FormControl fullWidth>
          <RHF.InputTextField
            placeholder="Текст ответа"
            multiline
            maxRows={10}
            minRows={2}
            name="content"
            control={control}
            inputProps={{
              maxLength: MAX_COMMENT_LENGTH,
              onChange: handleChange,
            }}
          />
          {errors?.content && (
            <FormHelperText error>{errors?.content.message}</FormHelperText>
          )}
        </FormControl>
      </StyledBox>
      <StyledStack>
        <StyledLoadingButton
          variant="contained"
          onClick={handleSubmit(handleSendComment)}
          loading={loading}
        >
          Отправить
        </StyledLoadingButton>
      </StyledStack>
    </form>
  );
};

export default SendComment;
