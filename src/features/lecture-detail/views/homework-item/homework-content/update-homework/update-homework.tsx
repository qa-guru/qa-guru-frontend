import React from "react";
import { Box, FormControl, FormHelperText, Stack } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import {
  IUpdateHomeWork,
  IUpdateHomeworkContent,
} from "./update-homework.types";
import {
  StyledCancelButton,
  StyledLoadingButton,
  StyledStack,
  StyledWrapper,
} from "./update-homework.styled";
import RHF from "../../../../../../shared/components/input-RHF";
import { client } from "../../../../../../api";

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
      if (isValid && e.target.value.length >= 2000) {
        setError("content", {
          type: "manual",
          message: t("homework.max")!,
        });
      }
    });
  };

  return (
    <form>
      <StyledWrapper spacing={2}>
        <Box width="100%">
          <FormControl fullWidth>
            <RHF.InputTextField
              multiline
              maxRows={10}
              minRows={5}
              name="content"
              control={control}
              inputProps={{
                maxLength: 2000,
                onChange: handleChange,
              }}
            />
            {errors?.content && (
              <FormHelperText error>{errors?.content.message}</FormHelperText>
            )}
          </FormControl>
          <StyledStack spacing={1}>
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
        </Box>
      </StyledWrapper>
    </form>
  );
};

export default UpdateHomework;
