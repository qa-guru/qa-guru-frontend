import React from "react";
import { Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import RHF from "../../../shared/InputRHF";
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { ISendHomeWorkContent } from "../LectureDetail/LectureDetail";

const style = {
  loadingButton: { minWidth: "143px", marginTop: "15px" },
};

interface ISendHomeWorkToCheck {
  sendHomeWork: (data: ISendHomeWorkContent) => void;
  handleSubmit: UseFormHandleSubmit<{ content: string }>;
  control: Control<{ content: string }, any>;
  loadingSendHomeWorkToCheck: boolean;
}

const SendHomeWorkToCheck: React.FC<ISendHomeWorkToCheck> = (props) => {
  const { sendHomeWork, loadingSendHomeWorkToCheck, control, handleSubmit } =
    props;

  return (
    <form>
      <Typography pt="40px" variant="h4" mb="15px">
        Ход выполнения
      </Typography>
      <RHF.InputTextField multiline rows={5} name="content" control={control} />
      <Box>
        <LoadingButton
          onClick={handleSubmit(sendHomeWork)}
          loading={loadingSendHomeWorkToCheck}
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
