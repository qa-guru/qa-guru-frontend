import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SubmitHandler, useForm } from "react-hook-form";
import { IUpdateComment, IUpdateCommentContent } from "./UpdateComment.types";
import RHF from "../../../../../shared/InputRHF";

const style = {
  loadingButton: { textTransform: "none", minWidth: "151px" },
  paper: { p: "20px", mt: "40px" },
  avatar: {
    width: 40,
    height: 40,
  },
  buttonCancel: {
    textTransform: "none",
    minWidth: "151px",
  },
};

const UpdateComment: React.FC<IUpdateComment> = (props) => {
  const { loading, updateComment, id, setSelectedIndex, content } = props;

  const { handleSubmit, control } = useForm<IUpdateCommentContent>({
    defaultValues: {
      content: content!,
    },
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

  return (
    <form>
      <Stack direction="row" spacing={2} mt="15px">
        <Box width="100%">
          <RHF.InputTextField
            multiline
            rows={5}
            name="content"
            control={control}
          />
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1} mt="15px">
            <LoadingButton
              onClick={handleSubmit(handleUpdateComment)}
              loading={loading}
              sx={style.loadingButton}
              variant="contained"
            >
              Отправить
            </LoadingButton>
            <Button
              onClick={() => setSelectedIndex(-111)}
              sx={style.buttonCancel}
              variant="contained"
            >
              Отменить
            </Button>
          </Stack>
        </Box>
      </Stack>
    </form>
  );
};

export default UpdateComment;
