import React from "react";
import { Box, Button, Stack } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { SubmitHandler, useForm } from "react-hook-form";
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
      <Stack direction="row" spacing={2}>
        <Box width="100%">
          <RHF.InputTextField
            multiline
            maxRows={10}
            minRows={2}
            name="content"
            control={control}
          />
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
