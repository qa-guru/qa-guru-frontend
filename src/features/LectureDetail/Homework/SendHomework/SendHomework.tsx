import React from "react";
import { Box, FormControl, FormHelperText, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { ISendHomeWork, ISendHomeWorkContent } from "./SendHomework.types";
import RHF from "../../../../shared/InputRHF";
import { client } from "../../../../api";

const style = {
  loadingButton: {
    textTransform: "none",
    minWidth: "151px",
    marginTop: "15px",
  },
};

const SendHomework: React.FC<ISendHomeWork> = (props) => {
  const { sendHomeWorkToCheck, loading } = props;
  const { lectureId } = useParams();
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ISendHomeWorkContent>({
    defaultValues: {
      content: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        content: yup
          .string()
          .required(t("sendHomework")!)
          .max(2000, "sendHomework.max"),
      })
    ),
  });

  const sendHomeWork: SubmitHandler<ISendHomeWorkContent> = (data) => {
    sendHomeWorkToCheck({
      variables: { lectureId: lectureId!, content: data.content },
      onCompleted: () =>
        client.refetchQueries({ include: ["homeWorkByLecture"] }),
    });
  };

  return (
    <form>
      <Stack direction="row" spacing={2} mt="15px">
        <Box width="100%">
          <FormControl fullWidth>
            <RHF.InputTextField
              placeholder="Текст ответа"
              multiline
              maxRows={10}
              minRows={5}
              name="content"
              control={control}
            />
            {errors?.content && (
              <FormHelperText error>{errors?.content.message}</FormHelperText>
            )}
          </FormControl>
          <LoadingButton
            onClick={handleSubmit(sendHomeWork)}
            loading={loading}
            sx={style.loadingButton}
            variant="contained"
          >
            Отправить
          </LoadingButton>
        </Box>
      </Stack>
    </form>
  );
};

export default SendHomework;
