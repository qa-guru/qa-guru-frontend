import UserRow from "shared/components/user-row";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { FC } from "react";
import { InputText } from "shared/components/form";

import {
  StyledBox,
  StyledCommentBox,
  StyledCommentStack,
  StyledLoadingButton,
  StyledStack,
} from "./answer-comment-styled";
import { IAnswerComment, IAnswerCommentContent } from "./answer-comment.types";

const AnswerComment: FC<IAnswerComment> = (props) => {
  const { answerComment, loading, id } = props;
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
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
