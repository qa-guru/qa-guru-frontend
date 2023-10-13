import React from "react";
import { FormControl, FormHelperText } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import RHF from "shared/components/input-RHF";
import { client } from "api";
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
import { MAX_HOMEWORK_LENGTH } from "../../../../constants/constants";

const UpdateHomework: React.FC<IUpdateHomeWork> = (props) => {
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
      content: answer!,
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
    updateHomework({
      variables: {
        id: id!,
        content: data.content,
      },
      onCompleted: () => {
        client.refetchQueries({ include: ["homeWorkByLecture"] });
        setOpenHomeWorkEdit(false);
      },
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
          <FormControl fullWidth>
            <RHF.InputTextField
              multiline
              maxRows={10}
              minRows={5}
              name="content"
              control={control}
              inputProps={{
                maxLength: MAX_HOMEWORK_LENGTH,
                onChange: handleChange,
              }}
            />
            {errors?.content && (
              <FormHelperText error>{errors?.content.message}</FormHelperText>
            )}
          </FormControl>
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
