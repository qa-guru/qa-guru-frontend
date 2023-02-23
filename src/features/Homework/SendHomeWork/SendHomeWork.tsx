import React from "react";
import { Box, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import RHF from "../../../shared/InputRHF";
import { ISendHomeWork, ISendHomeWorkContent } from "./SendHomeWork.types";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { client } from "../../../http";

const style = {
  loadingButton: {
    textTransform: "none",
    minWidth: "151px",
    marginTop: "15px",
  },
  paper: { padding: "20px", mt: "40px" },
  avatar: {
    width: 40,
    height: 40,
  },
};

const SendHomeWork: React.FC<ISendHomeWork> = (props) => {
  const { sendHomeWorkToCheck, loading } = props;
  const { lectureId } = useParams();
  const { handleSubmit, control } = useForm<ISendHomeWorkContent>({
    defaultValues: {
      content: "",
    },
  });

  const sendHomeWork: SubmitHandler<ISendHomeWorkContent> = (data) => {
    sendHomeWorkToCheck({
      variables: { lectureId: lectureId!, content: data.content },
      onCompleted: () =>
        client.refetchQueries({ include: ["homeWorkByStudentAndLecture"] }),
    });
  };

  return (
    <form>
      <Stack direction="row" spacing={2} mt="15px">
        <Box width="100%">
          <RHF.InputTextField
            placeholder="Текст ответа"
            multiline
            rows={5}
            name="content"
            control={control}
          />
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

export default SendHomeWork;
