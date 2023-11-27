import UserRow from "shared/components/user-row";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { ChangeEvent, FC, useCallback } from "react";
import InputText from "shared/components/form/input-text";
import {
  StyledBox,
  StyledCommentBox,
  StyledCommentStack,
  StyledLoadingButton,
  StyledStack,
} from "./answer-comment-styled";
import { IAnswerComment, IAnswerCommentContent } from "./answer-comment.types";
import { MAX_COMMENT_LENGTH } from "../../constants";

const AnswerComment: FC<IAnswerComment> = (props) => {
  const { answerComment, loading, id } = props;
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    setError,
    reset,
    formState: { errors },
    trigger,
  } = useForm({
    defaultValues: {
      content: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        content: yup.string().required(t("comment")),
      })
    ),
  });

  const handleAnswerComment: SubmitHandler<IAnswerCommentContent> = (data) => {
    if (id) {
      answerComment({
        variables: { parentID: id, content: data.content },
      }).then(() => {
        reset();
      });
    }
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      trigger("content").then((isValid) => {
        if (isValid && e.target.value.length >= MAX_COMMENT_LENGTH) {
          setError("content", {
            type: "manual",
            message: t("comment.max"),
          });
        }
      });
    },
    [trigger, setError, MAX_COMMENT_LENGTH, t]
  );

  return (
    <StyledCommentStack>
      <UserRow hideFullName />
      <StyledCommentBox>
        <form>
          <StyledBox>
            <InputText
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
              errors={errors}
            />
          </StyledBox>
          <StyledStack>
            <StyledLoadingButton
              variant="contained"
              onClick={handleSubmit(handleAnswerComment)}
              loading={loading}
            >
              Отправить
            </StyledLoadingButton>
          </StyledStack>
        </form>
      </StyledCommentBox>
    </StyledCommentStack>
  );
};

export default AnswerComment;
