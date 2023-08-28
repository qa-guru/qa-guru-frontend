import React, { useContext } from "react";
import { Box, FormControl, FormHelperText, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup/dist/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { ISendHomeWorkContent, ISendHomeWork } from "./SendHomework.types";
import RHF from "../../../../../../shared/components/InputRHF";
import { client } from "../../../../../../api";
import { LectureIdContext } from "../../../../context/LectureIdContext";

const style = {
  loadingButton: {
    textTransform: "none",
    minWidth: "151px",
    marginTop: "15px",
  },
};

const SendHomework: React.FC<ISendHomeWork> = (props) => {
  const { sendHomeWorkToCheck, loading } = props;
  const lectureId = useContext(LectureIdContext);
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    setError,
    formState: { errors },
    trigger,
  } = useForm<ISendHomeWorkContent>({
    defaultValues: {
      content: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        content: yup.string().required(t("homework")!),
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
              placeholder="Текст ответа"
              multiline
              maxRows={10}
              minRows={5}
              name="content"
              control={control}
              inputProps={{ maxLength: 2000, onChange: handleChange }}
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
