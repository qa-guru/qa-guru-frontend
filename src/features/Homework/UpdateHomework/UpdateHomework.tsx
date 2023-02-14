import React from "react";
import {
  IUpdateHomeWork,
  IUpdateHomeworkContent,
} from "./UpdateHomework.types";
import { Box, Button, Stack, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import RHF from "../../../shared/InputRHF";
import { LoadingButton } from "@mui/lab";
import { SubmitHandler, useForm } from "react-hook-form";
import useHomeworkAnswerId from "../../../hooks/useHomeworkAnswerId";

const style = {
  loadingButton: { minWidth: "151px", mt: "15px" },
  paper: { p: "20px", mt: "40px" },
  avatar: {
    width: 40,
    height: 40,
  },
  buttonCancel: {
    textTransform: "none",
    minWidth: "151px",
    mt: "15px",
    ml: "10px",
  },
};

const UpdateHomework: React.FC<IUpdateHomeWork> = (props) => {
  const { loading, updateHomeWork, setUpdateHomeworkAnswer } = props;
  const [homeworkIdAnswer] = useHomeworkAnswerId();
  const { handleSubmit, control } = useForm<IUpdateHomeworkContent>({
    defaultValues: {
      content: "",
    },
  });

  console.log(homeworkIdAnswer);

  const updateHomework: SubmitHandler<IUpdateHomeworkContent> = (data) => {
    updateHomeWork({
      variables: { id: homeworkIdAnswer!, content: data.content },
    }).then(() => {
      setUpdateHomeworkAnswer(false);
    });
  };

  return (
    <form>
      <Typography variant="h5" mb="15px">
        Ответ на задание
      </Typography>
      <Stack direction="row" spacing={2}>
        <Avatar
          sx={style.avatar}
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        <Box width="100%">
          <RHF.InputTextField
            placeholder="Текст ответа"
            multiline
            rows={5}
            name="content"
            control={control}
          />
          <LoadingButton
            onClick={handleSubmit(updateHomework)}
            loading={loading}
            sx={style.loadingButton}
            variant="contained"
          >
            Отправить
          </LoadingButton>
          <Button
            onClick={() => setUpdateHomeworkAnswer(false)}
            sx={style.buttonCancel}
            variant="contained"
          >
            Отменить
          </Button>
        </Box>
      </Stack>
    </form>
  );
};

export default UpdateHomework;
