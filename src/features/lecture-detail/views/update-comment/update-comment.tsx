import React from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { IUpdateComment, IUpdateCommentContent } from "./update-comment.types";
import {
  StyledBox,
  StyledButton,
  StyledButtonsStack,
  StyledLoadingButton,
  StyledStack,
} from "./update-comment.styled";
import RHF from "../../../../shared/components/input-RHF";
import { INITIAL_SELECTED_INDEX, MAX_COMMENT_LENGTH } from "../../constants";

const UpdateComment: React.FC<IUpdateComment> = (props) => {
  const { loading, updateComment, id, setSelectedIndex, content } = props;
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    trigger,
  } = useForm<IUpdateCommentContent>({
    defaultValues: {
      content: content!,
    },
    resolver: yupResolver(
      yup.object().shape({
        content: yup.string().required(t("comment")!),
      })
    ),
  });

  const handleUpdateComment: SubmitHandler<IUpdateCommentContent> = (data) => {
    updateComment({
      variables: {
        id: id!,
        content: data.content,
      },
      onCompleted: () => {
        setSelectedIndex(INITIAL_SELECTED_INDEX);
      },
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
      <StyledStack>
        <StyledBox>
          <FormControl fullWidth>
            <RHF.InputTextField
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
          <StyledButtonsStack>
            <StyledButton
              variant="contained"
              onClick={() => setSelectedIndex(INITIAL_SELECTED_INDEX)}
            >
              Отменить
            </StyledButton>
            <StyledLoadingButton
              variant="contained"
              onClick={handleSubmit(handleUpdateComment)}
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
