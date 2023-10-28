import { FC, ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import InputText from "shared/components/form/input-text";
import { IUpdateComment, IUpdateCommentContent } from "./update-comment.types";
import {
  StyledBox,
  StyledButton,
  StyledButtonsStack,
  StyledLoadingButton,
  StyledStack,
} from "./update-comment.styled";
import { INITIAL_SELECTED_INDEX, MAX_COMMENT_LENGTH } from "../../constants";

const UpdateComment: FC<IUpdateComment> = (props) => {
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

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
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
          <InputText
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
