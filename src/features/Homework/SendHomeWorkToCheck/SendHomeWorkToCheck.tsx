import React from "react";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import RHF from "../../../shared/InputRHF";
import {
  ISendHomeWorkContent,
  ISendHomeWorkToCheck,
} from "./SendHomeWorkToCheck.types";
import { useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { client } from "../../../http";

const style = {
  loadingButton: { minWidth: "143px", marginTop: "15px" },
};

const SendHomeWorkToCheck: React.FC<ISendHomeWorkToCheck> = (props) => {
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
    }).then(() =>
      client.refetchQueries({
        include: ["HomeWorkByStudentAndLectureDocument"],
      })
    );
  };

  return (
    <form>
      <Typography pt="40px" variant="h4" mb="15px">
        Задание
      </Typography>
      <RHF.InputTextField multiline rows={5} name="content" control={control} />
      <Box>
        <LoadingButton
          onClick={handleSubmit(sendHomeWork)}
          loading={loading}
          sx={style.loadingButton}
          variant="contained"
        >
          Отправить
        </LoadingButton>
      </Box>
    </form>
  );
};

export default SendHomeWorkToCheck;
