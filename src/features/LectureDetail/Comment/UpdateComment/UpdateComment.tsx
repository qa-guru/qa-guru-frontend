import React from "react";
import { Box, Button, FormControl, FormHelperText, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import { IUpdateComment, IUpdateCommentContent } from "./UpdateComment.types";
import RHF from "../../../../shared/InputRHF";
import { black } from "../../../../theme/colors";

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
        setSelectedIndex(-1);
      },
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
      <Stack direction="row" spacing={2}>
        <Box width="100%">
          <FormControl fullWidth>
            <RHF.InputTextField
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
          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            justifyContent="flex-end"
            spacing={1}
            mt="5px"
          >
            <Button
              onClick={() => setSelectedIndex(-1)}
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
