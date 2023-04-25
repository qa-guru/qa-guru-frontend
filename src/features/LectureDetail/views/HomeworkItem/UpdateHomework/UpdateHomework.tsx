import React from "react";
import { Box, Button, FormControl, FormHelperText, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import {
  IUpdateHomeWork,
  IUpdateHomeworkContent,
} from "./UpdateHomework.types";
import RHF from "../../../../../shared/InputRHF";
import { black } from "../../../../../theme/colors";
import { client } from "../../../../../api";

const style = {
  loadingButton: { minWidth: "151px" },
  paper: { p: "20px", mt: "40px" },
  buttonCancel: {
    minWidth: "116px",
    color: black.main,
  },
};

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
      <Stack direction="row" spacing={2} mt="15px">
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
          <Stack
            direction={{ xs: "column-reverse", sm: "row" }}
            justifyContent="flex-end"
            spacing={1}
            mt="5px"
          >
            <Button
              onClick={() => setOpenHomeWorkEdit(false)}
              sx={style.buttonCancel}
              variant="contained"
              color="secondary"
            >
              Отменить
            </Button>
            <LoadingButton
              onClick={handleSubmit(handleUpdateHomework)}
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

export default UpdateHomework;
