import React from "react";
import { Box, Button, FormControl, FormHelperText, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { IUpdateComment, IUpdateCommentContent } from "./UpdateComment.types";
import RHF from "../../../../../shared/InputRHF";
import { black } from "../../../../../theme/colors";

const style = {
  loadingButton: { minWidth: "147px" },
  buttonCancel: {
    minWidth: "116px",
    color: black.main,
  },
};

const UpdateComment: React.FC<IUpdateComment> = (props) => {
  const { loading, updateComment, id, setSelectedIndex, content } = props;
  const { t } = useTranslation();

  const {
    handleSubmit,
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<IUpdateCommentContent>({
    defaultValues: {
      content: content!,
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

  const handleUpdateComment: SubmitHandler<IUpdateCommentContent> = (data) => {
    updateComment({
      variables: {
        id: id!,
        content: data.content,
      },
      onCompleted: () => {
        setSelectedIndex(-111);
      },
    });
  };

  const handleInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    const { value } = event.currentTarget;
    if (value.length >= 10000) {
      setError("content", { message: t("sendComment.max")! });
    } else {
      clearErrors("content");
    }
  };

  return (
    <form>
      <Stack direction="row" spacing={2}>
        <Box width="100%">
          <FormControl fullWidth>
            <RHF.InputTextField
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
          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            justifyContent="flex-end"
            spacing={1}
            mt="5px"
          >
            <Button
              onClick={() => setSelectedIndex(-111)}
              sx={style.buttonCancel}
              variant="contained"
              color="secondary"
            >
              Отменить
            </Button>
            <LoadingButton
              onClick={handleSubmit(handleUpdateComment)}
              loading={loading}
              sx={style.loadingButton}
              variant="contained"
            >
              Отправить
            </LoadingButton>
          </Stack>
        </Box>
      </Stack>
    </form>
  );
};

export default UpdateComment;
