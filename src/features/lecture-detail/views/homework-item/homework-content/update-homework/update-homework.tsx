import { FC, ChangeEvent } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { client } from "api";
import { MAX_HOMEWORK_LENGTH } from "shared/constants";
import InputText from "shared/components/form/input-text";
import {
  IUpdateHomeWork,
  IUpdateHomeworkContent,
} from "./update-homework.types";
import {
  StyledBox,
  StyledCancelButton,
  StyledLoadingButton,
  StyledStack,
  StyledWrapper,
} from "./update-homework.styled";

const UpdateHomework: FC<IUpdateHomeWork> = (props) => {
  const { loading, updateHomework, setOpenHomeWorkEdit, answer, id } = props;

  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    setError,
  } = useForm<IUpdateHomeworkContent>({
    defaultValues: {
      content: answer,
    },
    resolver: yupResolver(
      yup.object().shape({
        content: yup.string().required(t("homework")!),
      })
    ),
  });

  const handleUpdateHomework: SubmitHandler<IUpdateHomeworkContent> = (
    data
  ) => {
    if (data.content && id) {
      updateHomework({
        variables: {
          id,
          content: data.content,
        },
        onCompleted: () => {
          client.refetchQueries({ include: ["homeWorkByLecture"] });
          setOpenHomeWorkEdit(false);
        },
      });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    trigger("content").then((isValid) => {
      if (isValid && e.target.value.length >= MAX_HOMEWORK_LENGTH) {
        setError("content", {
          type: "manual",
          message: t("homework.max")!,
        });
      }
    });
  };

  return (
    <form>
      <StyledWrapper>
        <StyledBox>
          <InputText
            multiline
            maxRows={10}
            minRows={5}
            name="content"
            control={control}
            inputProps={{
              maxLength: MAX_HOMEWORK_LENGTH,
              onChange: handleChange,
            }}
            errors={errors}
          />
          <StyledStack>
            <StyledCancelButton onClick={() => setOpenHomeWorkEdit(false)}>
              Отменить
            </StyledCancelButton>
            <StyledLoadingButton
              onClick={handleSubmit(handleUpdateHomework)}
              loading={loading}
            >
              Отправить
            </StyledLoadingButton>
          </StyledStack>
        </StyledBox>
      </StyledWrapper>
    </form>
  );
};

export default UpdateHomework;
